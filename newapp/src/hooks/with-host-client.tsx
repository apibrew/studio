import {ComponentType} from "react";
import {ClientProvider} from "@apibrew/react";
import {getHostClient} from "./use-host-client.tsx";


export function withHostClient<T>(Component: ComponentType<T>): ComponentType<T> {
    const client = getHostClient()

    return (props: T) => {
        return <>
            <ClientProvider value={client}>
                <Component {...props as any}/>
            </ClientProvider>
        </>
    };
}
