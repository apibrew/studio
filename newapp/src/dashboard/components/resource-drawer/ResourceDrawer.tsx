import {Resource} from "@apibrew/react";

import toast from "react-hot-toast";
import {Client} from "@apibrew/client";
import {MultiDrawerProps} from "../multi-drawer/MultiDrawer.tsx";
import {handleErrorMessage} from "../../../util/errors.ts";
import {ResourceMainForm} from "./ResourceMainForm.tsx";
import {ResourceAdvancedForm} from "./ResourceAdvancedForm.tsx";
import {ResourcePropertiesForm} from "./ResourcePropertiesForm.tsx";
import {ResourceSourceFormWrapper} from "./ResourceSourceForm.tsx";

export function resourceDrawerMultiDrawer(client: Client, isNew: boolean, initialValue: Partial<Resource>, onClose?: () => void): MultiDrawerProps<Resource> {
    return {
        title: isNew ? 'New Resource' : '' + initialValue.name,
        tabs: [
            {
                name: 'Main',
                component: ResourceMainForm,
                isInitiallyValid: false
            },
            {
                name: 'Properties',
                component: props => ResourcePropertiesForm({...props, resource: props.value})
            },
            // {
            //     name: 'Schema',
            //     component: ResourceSchemaForm
            // },
            {
                name: 'Advanced',
                component: ResourceAdvancedForm
            },
            {
                name: 'Source',
                component: ResourceSourceFormWrapper
            }
        ],
        initialValue: initialValue,
        sx: {
            width: '1000px'
        },
        onClose: onClose,
        onSave: (resource, onClose) => {
            if (isNew) {
                toast.promise(client.createResource(resource, true), {
                    loading: 'Creating resource...',
                    success: 'Resource created',
                    error: err => handleErrorMessage(err)
                }).then(() => {
                    if (onClose) {
                        onClose()
                    }
                }, console.error)
            } else {
                toast.promise(client.updateResource(resource, true), {
                    loading: 'Updating resource...',
                    success: 'Resource updated',
                    error: err => handleErrorMessage(err)
                }).then(() => {
                    if (onClose) {
                        onClose()
                    }
                }, console.error)
            }
        }
    }
}
