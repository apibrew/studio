import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Client, ClientImpl} from "@apibrew/client";
import {newClientByServerConfig} from "@apibrew/client/client";
import {ClientProvider, cloudConnectionProvider, Connection, LocalStorageTokenStorage} from "@apibrew/react";
import toast from "react-hot-toast";
import {DashboardLayout} from "./layout/DashboardLayout.tsx";
import {ConnectionContext} from "./context/ConnectionContext";
import {Resource, User} from "@apibrew/client/model";
import {UserEntityInfo} from "@apibrew/client/model/user";
import {handleErrorMessage} from "../util/errors.ts";
import {useHostClient} from "../hooks/use-host-client.tsx";
import {CurrentUserContext} from "../context/current-user.tsx";
import {CurrentAccountContext} from "../context/current-account.tsx";
import {Account, AccountEntityInfo} from "../cloud/model/account.ts";
import {CurrentInstanceContext} from "../context/current-instance.tsx";
import {Instance, InstanceEntityInfo} from "../cloud/model/instance.ts";
import {ensureResource} from "../util/ensure-resource.ts";
import {Settings, SettingsEntityInfo, SettingsResource} from "./model/settings.ts";
import {StudioSettingsContext} from "./context/studio-settings.tsx";
import {HostedInstance, HostedInstanceEntityInfo} from "../cloud/model/hosted-instance.ts";


export function DashboardPage() {
    const params = useParams()
    const connectionName = params['connectionName']!

    const [client, setClient] = useState<Client>()
    const [connection, setConnection] = useState<Connection>()
    const hostClient = useHostClient()

    const userRepository = hostClient.repository<User>(UserEntityInfo)
    const accountRepository = hostClient.repository<Account>(AccountEntityInfo)
    const instanceRepository = hostClient.repository<Instance>(InstanceEntityInfo)
    const hostedInstanceRepository = hostClient.repository<HostedInstance>(HostedInstanceEntityInfo)
    const [user, setUser] = useState<User>()
    const [account, setAccount] = useState<Account>()
    const [instance, setInstance] = useState<Instance>()
    const [hostedInstance, setHostedInstance] = useState<HostedInstance>()

    useEffect(() => {
        const username = hostClient.getTokenBody()?.username
        userRepository.load({
            username: username
        }).then(user => {
            setUser(user)
        }).catch(err => {
            console.error(err)
            toast.error(handleErrorMessage(err))
        })
        accountRepository.load({
            email: username
        }, ['$.plan']).then(account => {
            setAccount(account)
        }).catch(err => {
            console.error(err)
            toast.error(handleErrorMessage(err))
        })
        if (connectionName.startsWith('project-')) {
            instanceRepository.load({
                name: connectionName,
                owner: username
            }).then(setInstance)
                .catch(err => {
                    console.error(err)
                })
        } else {
            hostedInstanceRepository.load({
                name: connectionName
            }).then(hostedInstance => {
                setHostedInstance(hostedInstance)
            })
                .catch(err => {
                    console.error(err)
                })
        }
    }, [hostClient]);

    const [settings, setSettings] = useState<Settings>()

    const loadSettings = async (client: Client) => {
        const repo = client.repository<Settings>(SettingsEntityInfo)

        try {
            const settings = await repo.load({
                name: 'default'
            })

            setSettings(settings)
        } catch (e) {
            console.error('Failed to load settings', e)

            const settings = await repo.create({
                name: 'default'
            } as Settings)

            setSettings(settings)
        }
    }

    useEffect(() => {
        if (client) {
            ensureResource(client, SettingsResource as Resource, true).then(() => {
                return loadSettings(client)
            })
        }
    }, [client])

    useEffect(() => {
        if (connectionName === 'manager') {
            setClient(hostClient)
            setConnection({
                name: 'manager',
                serverConfig: {}
            } as Connection)
            return;
        }

        if (connectionName === 'local') {
            const client = new ClientImpl('http://localhost:9009')
            client.useTokenStorage(new LocalStorageTokenStorage('local'))
            if (!client.isAuthenticated()) {
                client.authenticateWithUsernameAndPassword('admin', 'admin')
            }
            setClient(client)
            setConnection({
                name: 'local',
                serverConfig: {}
            } as Connection)
            return;
        }

        if (hostedInstance) {
            let url = hostedInstance.host + ":" + hostedInstance.port
            if (hostedInstance.secure) {
                url = 'https://' + url
            } else {
                url = 'http://' + url
            }

            const client = new ClientImpl(url)
            client.useTokenStorage(new LocalStorageTokenStorage(hostedInstance.name))
            if (!client.isAuthenticated()) {
                client.authenticateWithToken(hostedInstance.token)
            }
            setClient(client)
            setConnection({
                name: hostedInstance.name,
                serverConfig: {
                    port: hostedInstance.port,
                    host: hostedInstance.host,
                    authentication: {
                        token: hostedInstance.token
                    },
                    insecure: !hostedInstance.secure
                }
            } as Connection)
            return;
        }

        if (instance) {
            const connection = cloudConnectionProvider.getConnection(connectionName)

            connection.then(connection => {
                if (!connection) {
                    console.log('no connection found')
                    alert('No connection found')
                    window.location.href = '/connections'
                    return;
                }

                setConnection(connection)

                connection.serverConfig.httpPort = 443

                newClientByServerConfig(connection.serverConfig).then(client => {
                    setClient(client)
                    client.useTokenStorage(new LocalStorageTokenStorage(connection.name))
                }, err => {
                    toast.error(err.message)

                    window.location.href = '/connections'
                    return;
                })
            })
        }
    }, [connectionName, instance, hostedInstance])

    return <>
        <ClientProvider value={client}>
            <ConnectionContext.Provider value={connection}>
                <CurrentUserContext.Provider value={user}>
                    <CurrentAccountContext.Provider value={account}>
                        <CurrentInstanceContext.Provider value={instance}>
                            {settings && <StudioSettingsContext.Provider value={settings}>
                                {client && <DashboardLayout/>}
                            </StudioSettingsContext.Provider>}
                        </CurrentInstanceContext.Provider>
                    </CurrentAccountContext.Provider>
                </CurrentUserContext.Provider>
            </ConnectionContext.Provider>
        </ClientProvider>
    </>
}
