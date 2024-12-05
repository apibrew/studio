import {useClient} from "@apibrew/react";
import {useMemo} from "react";
import {ResourceService} from "../service/resource-service.ts";

export function useResourceService() {
    const client = useClient();

    return useMemo(() => new ResourceService(client), [client]);
}
