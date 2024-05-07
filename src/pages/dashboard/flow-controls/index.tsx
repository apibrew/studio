import {Outlet} from "react-router-dom";
import {ensureResource} from "../../../logic/ensure-resource";
import {Resource, useClient} from "@apibrew/react";
import {FlowControlResource} from "../../../model/flow-control";

export function FlowControlPage() {
    const client = useClient()
    ensureResource(client, FlowControlResource as Resource, true)

    return <>
        <Outlet/>
    </>
}
