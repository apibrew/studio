import {Client, ClientImpl} from "@apibrew/client";
import {LocalStorageTokenStorage} from "@apibrew/react";


const client = new ClientImpl('https://manager.apibrew.io')
client.useTokenStorage(new LocalStorageTokenStorage('manager'))

export function useHostClient(): Client {
    return client
}

export function getHostClient(): Client {
    return client
}
