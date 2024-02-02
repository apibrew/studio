import {Server} from "@apibrew/client/config";

export interface Connection {
    name: string
    title?: string
    serverConfig: Server
}

export interface ConnectionProvider {
    allowManageConnections?: boolean;

    allowUserSwitchConnections?: boolean;

    getConnection(name: string): Promise<Connection | undefined>;

    getDefaultConnection(): Promise<Connection | undefined>;

    listConnections?(): Promise<Connection[]>;

    createConnection?(connection: Connection): Promise<void>;

    updateConnection?(connection: Connection): Promise<void>;

    deleteConnection?(name: string): Promise<void>;
}

const connectionProviderName = process.env.REACT_APP_CONNECTION_PROVIDER

let _connectionProvider: ConnectionProvider;

if (connectionProviderName === 'LOCAL_ENV') {
    _connectionProvider = {
        allowManageConnections: true,
        getConnection(): Promise<Connection | undefined> {
            return Promise.reject('Not implemented')
        }, getDefaultConnection(): Promise<Connection | undefined> {
            return Promise.resolve({
                name: 'local',
                serverConfig: {
                    name: 'default',
                    host: process.env.REACT_APP_APBR_HOST || 'localhost',
                    port: parseInt(process.env.REACT_APP_APBR_PORT || '9009'),
                    httpPort: (process.env.REACT_APP_APBR_HTTP_PORT ? parseInt(process.env.REACT_APP_APBR_HTTP_PORT || '9009') : undefined) as number,
                    insecure: process.env.REACT_APP_APBR_INSECURE === 'true',
                    authentication: {
                        username: process.env.REACT_APP_APBR_AUTHENTICATION_USERNAME as string,
                        password: process.env.REACT_APP_APBR_AUTHENTICATION_PASSWORD as string,
                        token: process.env.REACT_APP_APBR_AUTHENTICATION_TOKEN as string,
                    }
                }
            });
        }

    }
} else if (connectionProviderName === 'WEB') {
    _connectionProvider = {
        createConnection(connection: Connection): Promise<void> {
            localStorage.setItem('connection_' + connection.name, JSON.stringify(connection))
            return Promise.resolve();
        },
        deleteConnection(name: string): Promise<void> {
            localStorage.removeItem('connection_' + name)
            return Promise.resolve();
        },
        updateConnection(connection: Connection): Promise<void> {
            localStorage.setItem('connection_' + connection.name, JSON.stringify(connection))
            return Promise.resolve();
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
            return Promise.resolve(connections);
        },
        allowManageConnections: true,
        getConnection(name: string): Promise<Connection | undefined> {
            const connectionStr = localStorage.getItem('connection_' + name)

            if (!connectionStr) {
                return Promise.resolve(undefined)
            }

            return Promise.resolve(JSON.parse(connectionStr) as Connection);
        }, getDefaultConnection(): Promise<Connection | undefined> {
            return Promise.resolve(undefined);
        }

    }
} else {
    console.log('process.env', process.env)
    throw new Error('Unknown connection provider: ' + connectionProviderName)
}

export const connectionProvider = _connectionProvider;