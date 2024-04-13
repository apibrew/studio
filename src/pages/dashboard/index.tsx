import React, {useState} from "react";
import {DashboardLayout} from "../../layout/DashboardLayout";
import {Outlet, useParams} from "react-router-dom";
import {Connection, connectionProvider} from "../../connection-provider";
import {Client, ClientImpl} from "@apibrew/client";
import {newClientByServerConfig} from "@apibrew/client/client";
import {ClientProvider, LocalStorageTokenStorage} from "@apibrew/react";
import toast from "react-hot-toast";
import {ConnectionContext} from "../../context/ConnectionContext";


export function DashboardPage() {
    const params = useParams()
    const connectionName = params['connectionName']!

    const [client, setClient] = useState<Client>()
    const [connection, setConnection] = useState<Connection>()

    React.useEffect(() => {
        if (connectionName === 'manager') {
            const client = new ClientImpl('https://manager.apibrew.io:8443')
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
                name: 'manager',
                serverConfig: {}
            } as Connection)
            return;
        }

        const connection = connectionProvider.getConnection(connectionName)

        connection.then(connection => {
            if (!connection) {
                console.log('no connection found')
                alert('No connection found')
                window.location.href = '/connections'
                return;
            }

            setConnection(connection)

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
                {client && <DashboardLayout>
                    <Outlet/>
                </DashboardLayout>}
            </ConnectionContext.Provider>
        </ClientProvider>
    </>
}
