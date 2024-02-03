import React from "react";
import {DashboardLayout} from "../../layout/DashboardLayout";
import {Outlet, useParams} from "react-router-dom";
import {connectionProvider} from "../../connection-provider";
import {Client} from "@apibrew/client";
import {newClientByServerConfig} from "@apibrew/client/client";
import {ClientProvider, LocalStorageTokenStorage} from "@apibrew/react";
import toast from "react-hot-toast";


export function DashboardPage() {
    const params = useParams()
    const connectionName = params['connectionName']!

    const [client, setClient] = React.useState<Client>()

    React.useEffect(() => {
        const connection = connectionProvider.getConnection(connectionName)

        connection.then(connection => {
            if (!connection) {
                window.location.href = '/connections'
                return;
            }

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
            {client && <DashboardLayout>
                <Outlet/>
            </DashboardLayout>}
        </ClientProvider>
    </>
}
