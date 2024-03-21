import React, {useState} from "react";
import {DashboardLayout} from "../../layout/DashboardLayout";
import {Outlet, useParams} from "react-router-dom";
import {Connection, connectionProvider} from "../../connection-provider";
import {Client} from "@apibrew/client";
import {newClientByServerConfig} from "@apibrew/client/client";
import {ClientProvider, LocalStorageTokenStorage} from "@apibrew/react";
import toast from "react-hot-toast";
import {ConnectionContext} from "../../context/ConnectionContext";
import axios from "axios";


export function DashboardPage() {
    const params = useParams()
    const connectionName = params['connectionName']!

    const [client, setClient] = useState<Client>()
    const [connection, setConnection] = useState<Connection>()

    React.useEffect(() => {
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
