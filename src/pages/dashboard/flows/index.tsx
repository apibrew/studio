import {Outlet} from "react-router-dom";
import {ensureResource} from "../../../logic/ensure-resource";
import {Resource, useClient} from "@apibrew/react";
import {FlowResource} from "../../../model/flow";
import {UserRegistrationExampleStatements} from "./user-registration-example";
import {UserEmailVerification} from "./user-email-verification";

export function FlowPage() {
    const client = useClient()
    ensureResource(client, FlowResource as Resource)

    console.log(UserEmailVerification)

    return <>
        <Outlet/>
    </>
}