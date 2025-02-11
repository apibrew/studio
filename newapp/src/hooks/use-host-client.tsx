import {Client, ClientImpl} from "@apibrew/client";
import {LocalStorageTokenStorage} from "@apibrew/react";
import {backendMode, singleBackendConfig} from "../config";

let client: Client

switch (backendMode) {
    case 'single': {
        const resp = singleBackendConfig()
        client = new ClientImpl(resp.backendUrl)
        client.useTokenStorage(new LocalStorageTokenStorage('single'))

        break
    }
    case 'cloud': {
        const client = new ClientImpl('https://manager.apibrew.io')
        client.useTokenStorage(new LocalStorageTokenStorage('manager'))
    }
}

export function useHostClient(): Client {
    return client
}

export function getHostClient(): Client {
    throw new Error('Not implemented')
}
