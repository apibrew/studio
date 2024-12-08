import {useMemo} from "react";
import {ResourceService} from "../service/resource-service.ts";
import {useClient} from "@apibrew/react";
import {Client} from "@apibrew/client";

export function useResourceService() {
    const client = useClient();

    return useMemo(() => new ResourceService(client as Client), [client]);
}
