import {Resource} from "@apibrew/react";
import {Client} from "@apibrew/client";

export async function ensureResource(client: Client, resource: Resource): Promise<void> {
    client.getResourceByName(resource.namespace.name, resource.name)
        .then((existing) => {
            resource.id = existing.id
            // already exists
            // return client.updateResource(resource, true)
        })
        .catch(() => {
            return client.createResource(resource, true);
        });
}