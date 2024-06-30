import {Outlet} from "react-router-dom";
import {ClientImpl} from "@apibrew/client";
import {ClientProvider, LocalStorageTokenStorage} from "@apibrew/react";
import {useEffect} from "react";


const client = new ClientImpl('https://manager.apibrew.io')
client.useTokenStorage(new LocalStorageTokenStorage('manager'))

export default function () {
    useEffect(() => {
        client.refreshToken()
    }, []);

    return <>
        <ClientProvider value={client}>
            <Outlet/>
        </ClientProvider>
    </>
}
