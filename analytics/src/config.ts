import {Server} from "@apibrew/client/config";

export const localConfig = {
    name: 'analytics',
    host: 'http://127.0.0.1',
    insecure: false,
    port: 9009,
    httpPort: 9009,
    authentication: {
        username: 'admin',
        password: 'c79161cc6c77341a0a2ccaf879ad9699'
    }
} as Server

export const prodConfig = {
    name: 'analytics',
    host: 'https://analytics.tisserv.net',
    port: 443,
    httpPort: 443,
    insecure: false,
    authentication: {
        username: 'admin',
        password: 'c79161cc6c77341a0a2ccaf879ad9699'
    }
} as Server
