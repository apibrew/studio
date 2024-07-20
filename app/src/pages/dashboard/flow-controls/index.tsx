import {Outlet} from "react-router-dom";
import {ensureResource} from "../../../logic/ensure-resource";
import {FlowControlTypeResource} from "../../../model/flow-control-type";
import {Resource, useClient} from "@apibrew/react";
import {Client} from "@apibrew/client";

export function FlowControlPage() {
    const client = useClient()
    ensureResource(client as Client, FlowControlTypeResource as Resource, true)

    return <>
        <Outlet/>
    </>
}
