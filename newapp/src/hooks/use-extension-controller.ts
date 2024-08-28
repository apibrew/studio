import {useTokenBody} from "@apibrew/react";
import {checkResourceAccess} from "@apibrew/client/util/authorization";
import {ExtensionResource} from "@apibrew/client/model/extension";
import {Resource} from "@apibrew/client/model";
import {Operation} from "@apibrew/client/model/permission";

export interface useExtensionControllerResult {
    isExtensionController: boolean
}

export function useExtensionController(): useExtensionControllerResult {
    const tokenBody = useTokenBody()
    const isExtensionController = checkResourceAccess(tokenBody.permissions as any, ExtensionResource as Resource, Operation.FULL)

    return {
        isExtensionController: isExtensionController,
    }
}
