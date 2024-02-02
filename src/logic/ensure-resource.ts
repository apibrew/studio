import {Resource} from "@apibrew/react";
import {Client} from "@apibrew/client";

export async function ensureResource(client: Client, resource: Resource, override?: boolean): Promise<void> {
    client.getResourceByName(resource.namespace.name, resource.name)
        .then((existing) => {
            resource.id = existing.id
            // already exists
            if (override) {
                return client.updateResource(resource, true)
            }
        })
        .catch(() => {
            return client.createResource(resource, true);
        });
}