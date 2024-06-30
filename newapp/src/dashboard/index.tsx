import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Client, ClientImpl} from "@apibrew/client";
import {newClientByServerConfig} from "@apibrew/client/client";
import {ClientProvider, cloudConnectionProvider, Connection, LocalStorageTokenStorage} from "@apibrew/react";
import toast from "react-hot-toast";
import {DashboardLayout} from "./layout/DashboardLayout.tsx";
import { ConnectionContext } from "./context/ConnectionContext";


export function DashboardPage() {
    const params = useParams()
    const connectionName = params['connectionName']!

    const [client, setClient] = useState<Client>()
    const [connection, setConnection] = useState<Connection>()

    useEffect(() => {
        if (connectionName === 'manager') {
            const client = new ClientImpl('https://manager.apibrew.io')
            client.useTokenStorage(new LocalStorageTokenStorage('manager'))
            setClient(client)
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

        if (connectionName === 'analytics') {
            const client = new ClientImpl('https://analytics.tisserv.net')
            client.useTokenStorage(new LocalStorageTokenStorage('local'))
            if (!client.isAuthenticated()) {
                client.authenticateWithUsernameAndPassword('admin', 'c79161cc6c77341a0a2ccaf879ad9699')
            }
            setClient(client)
            setConnection({
                name: 'local',
                serverConfig: {}
            } as Connection)
            return;
        }

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
    }, [connectionName])

    return <>
        <ClientProvider value={client}>
            <ConnectionContext.Provider value={connection}>
                {client && <DashboardLayout/>}
            </ConnectionContext.Provider>
        </ClientProvider>
    </>
}
