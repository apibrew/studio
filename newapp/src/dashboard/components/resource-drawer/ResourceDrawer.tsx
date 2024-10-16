import {Resource} from "@apibrew/react";

import toast from "react-hot-toast";
import {Repository} from "@apibrew/client";
import {MultiDrawerProps} from "../multi-drawer/MultiDrawer.tsx";
import {handleErrorMessage} from "../../../util/errors.ts";
import {ResourceMainForm} from "./ResourceMainForm.tsx";
import {ResourceAdvancedForm} from "./ResourceAdvancedForm.tsx";
import {ResourcePropertiesForm} from "./ResourcePropertiesForm.tsx";
import {ResourceSourceForm} from "./ResourceSourceForm.tsx";

// import {ResourceTypesForm} from "./ResourceTypesForm.tsx";

export function resourceDrawerMultiDrawer(repository: Repository<Resource>, isNew: boolean, initialValue: Partial<Resource>, onClose?: () => void): MultiDrawerProps<Resource> {
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
                component: ResourcePropertiesForm
            },
            // {
            //     name: 'Types',
            //     component: ResourceTypesForm
            // },
            {
                name: 'Advanced',
                component: ResourceAdvancedForm
            },
            {
                name: 'Source',
                component: ResourceSourceForm
            }
        ],
        initialValue: initialValue,
        sx: {
            width: '1000px'
        },
        onClose: onClose,
        onSave: (resource, onClose) => {
            if (isNew) {
                toast.promise(repository.create(resource), {
                    loading: 'Creating resource...',
                    success: 'Resource created',
                    error: err => handleErrorMessage(err)
                }).then(() => {
                    if (onClose) {
                        onClose()
                    }
                }, console.error)
            } else {
                toast.promise(repository.update(resource), {
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
