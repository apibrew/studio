import {Outlet} from "react-router-dom";
import {ensureResource} from "../../../logic/ensure-resource";
import {Resource, useClient} from "@apibrew/react";
import {FlowControlTypeResource} from "../../../model/flow-control-type";

export function FlowControlPage() {
    const client = useClient()
    ensureResource(client, FlowControlTypeResource as Resource, true)

    return <>
        <Outlet/>
    </>
}
