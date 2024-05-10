import {cloudConnectionProvider, ConnectionProvider} from "@apibrew/react";
import {Connection} from '@apibrew/react/connection-provider';

const connectionProviderName = import.meta.env.VITE_APP_CONNECTION_PROVIDER

let _connectionProvider: ConnectionProvider = undefined as any

if (connectionProviderName === 'LOCAL_ENV') {
    _connectionProvider = {
        getConnection(): Promise<Connection> {
            return Promise.resolve({
                name: 'local',
                serverConfig: {
                    name: 'local',
                    host: import.meta.env.VITE_APP_APBR_HOST,
                    httpPort: parseInt(import.meta.env.VITE_APP_APBR_HTTP_PORT || '9009'),
                    insecure: import.meta.env.VITE_APP_APBR_INSECURE === 'true',
                    authentication: {
                        token: import.meta.env.VITE_APP_APBR_AUTHENTICATION_TOKEN,
                        username: import.meta.env.VITE_APP_APBR_AUTHENTICATION_USERNAME,
                        password: import.meta.env.VITE_APP_APBR_AUTHENTICATION_PASSWORD
                    }
                }
            } as Connection)
        }
    }
} else if (connectionProviderName === 'WEB') {
    _connectionProvider = {
        createConnection(connection: Connection): Promise<void> {
            localStorage.setItem(
                'connection_' + connection.name,
                JSON.stringify(connection)
            )
            return Promise.resolve()
        },
        deleteConnection(name: string): Promise<void> {
            localStorage.removeItem('connection_' + name)
            return Promise.resolve()
        },
        updateConnection(connection: Connection): Promise<void> {
            localStorage.setItem(
                'connection_' + connection.name,
                JSON.stringify(connection)
            )
            return Promise.resolve()
        },
        listConnections(): Promise<Connection[]> {
            const connections: Connection[] = []
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i)
                if (key && key.startsWith('connection_')) {
                    const connectionStr = localStorage.getItem(key)
                    if (connectionStr) {
                        connections.push(JSON.parse(connectionStr) as Connection)
                    }
                }
            }
            return Promise.resolve(connections)
        },
        allowManageConnections: true,
        getConnection(name: string): Promise<Connection> {
            const connectionStr = localStorage.getItem('connection_' + name)

            if (!connectionStr) {
                return Promise.reject(new Error("'Connection not found: ' + name"))
            }

            return Promise.resolve(JSON.parse(connectionStr) as Connection)
        }
    }
} else {
    _connectionProvider = cloudConnectionProvider
}

export const connectionProvider = _connectionProvider
