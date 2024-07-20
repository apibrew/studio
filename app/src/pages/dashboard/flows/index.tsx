import {Outlet} from "react-router-dom";
import {ensureResource} from "../../../logic/ensure-resource";
import {Resource, useClient} from "@apibrew/react";
import {FlowResource} from "../../../model/flow";
import {Client} from "@apibrew/client";

export function FlowPage() {
    const client = useClient()
    ensureResource(client as Client, FlowResource as Resource, true)

    return <>
        <Outlet/>
    </>
}
