import {ComponentType} from "react";
import {ClientImpl} from "@apibrew/client";
import {ClientProvider, LocalStorageTokenStorage} from "@apibrew/react";


export function withHostClient<T>(Component: ComponentType<T>): ComponentType<T> {
    const client = new ClientImpl('https://manager.apibrew.io')
    client.useTokenStorage(new LocalStorageTokenStorage('manager'))

    return (props: T) => {
        return <>
            <ClientProvider value={client}>
                <Component {...props as any}/>
            </ClientProvider>
        </>
    };
}
