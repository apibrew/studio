import {Outlet} from "react-router-dom";
import {ClientImpl} from "@apibrew/client";
import {ClientProvider, LocalStorageTokenStorage} from "@apibrew/react";
import React from "react";

export default function () {
    const client = new ClientImpl('https://manager.apibrew.io:8443')
    client.useTokenStorage(new LocalStorageTokenStorage('manager'))

    return <>
        <ClientProvider value={client}>
            <Outlet/>
        </ClientProvider>
    </>
}