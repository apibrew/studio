import {Resource} from "@apibrew/react";

import toast from "react-hot-toast";
import {MultiDrawerProps} from "../multi-drawer/MultiDrawer.tsx";
import {handleErrorMessage} from "../../../util/errors.ts";
import {ResourceMainForm} from "./ResourceMainForm.tsx";
import {ResourceAdvancedForm} from "./ResourceAdvancedForm.tsx";
import {ResourcePropertiesForm} from "./ResourcePropertiesForm.tsx";
import {ResourceSourceFormWrapper} from "./ResourceSourceForm.tsx";
import {ResourceService} from "../../../service/resource-service.ts";

export function resourceDrawerMultiDrawer(service: ResourceService, isNew: boolean, initialValue: Partial<Resource>, onClose?: () => void): MultiDrawerProps<Resource> {
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
                toast.promise(service.createResource(resource), {
                    loading: 'Creating resource...',
                    success: 'Resource created',
                    error: err => handleErrorMessage(err)
                }).then(() => {
                    if (onClose) {
                        onClose()
                    }
                }, console.error)
            } else {
                toast.promise(service.updateResource(resource), {
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
