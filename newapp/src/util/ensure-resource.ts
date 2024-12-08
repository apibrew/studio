import {Namespace, Resource, useClient} from "@apibrew/react";
import {Client} from "@apibrew/client";
import {NamespaceEntityInfo} from "@apibrew/client/model/namespace";
import {useEffect} from "react";

export async function ensureResource(client: Client, resource: Resource, override?: boolean): Promise<void> {
    await client.getResourceByName(resource.namespace.name, resource.name)
        .then((existing) => {
            resource.id = existing.id
            // already exists
            if (override) {
                return client.updateResource(resource, true)
            }
        })
        .catch(async () => {
            await client.applyRecord<Namespace>(NamespaceEntityInfo, {
                "name": resource.namespace.name,
            } as Namespace)

            return client.createResource(resource, true);
        });
}

export async function useEnsureResource(resource: Resource, override?: boolean) {
    const client = useClient()

    useEffect(() => {
        ensureResource(client as Client, resource, override)
    }, []);
}
