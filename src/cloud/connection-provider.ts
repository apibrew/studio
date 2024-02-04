import {Connection, ConnectionProvider} from "../connection-provider";

export const cloudConnectionProvider: ConnectionProvider = {
    connectionsPageLink: '/cloud/instances',
    createConnection(connection: Connection): Promise<void> {
        throw new Error('Not implemented')
    },
    deleteConnection(name: string): Promise<void> {
        throw new Error('Not implemented')
    },
    updateConnection(connection: Connection): Promise<void> {
        throw new Error('Not implemented')
    },
    async listConnections(): Promise<Connection[]> {
        return []
    },
    allowManageConnections: true,
    getConnection(name: string): Promise<Connection> {
        const localStorageItem = localStorage.getItem(`@apibrew/client/${name}/token`)

        if (localStorageItem === null) {
            return Promise.reject('Not found: ' + name)
        }

        const tokenData = JSON.parse(localStorageItem)

        return Promise.resolve({
            name: name,
            title: name,
            serverConfig: {
                host: `https://${name}.apibrew.io`,
                httpPort: 8443,
                authentication: {
                    token: tokenData["ACCESS_TOKEN"] as string
                }
            }
        } as Connection)
    }
}