import {Outlet} from "react-router-dom";
import {ClientProvider} from "@apibrew/react";
import {useEffect} from "react";
import {useHostClient} from "../hooks/use-host-client.tsx";


export default function () {
    const hostClient = useHostClient()
    useEffect(() => {
        hostClient.refreshToken()
    }, []);

    return <>
        <ClientProvider value={hostClient}>
            <Outlet/>
        </ClientProvider>
    </>
}
