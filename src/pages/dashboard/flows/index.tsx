import {Outlet} from "react-router-dom";
import {ensureResource} from "../../../logic/ensure-resource";
import {Resource, useClient} from "@apibrew/react";
import {FlowResource} from "../../../model/flow";

export function FlowPage() {
    const client = useClient()
    ensureResource(client, FlowResource as Resource)

    return <>
        <Outlet/>
    </>
}