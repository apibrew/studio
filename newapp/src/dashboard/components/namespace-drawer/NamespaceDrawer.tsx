import {Namespace} from "@apibrew/react";
import {NamespaceForm} from "../namespace-form/NamespaceForm";

import toast from "react-hot-toast";
import {MultiDrawerProps} from "../multi-drawer/MultiDrawer.tsx";
import {Repository} from "@apibrew/client";
import {handleErrorMessage} from "../../../util/errors.ts";


export function namespaceDrawerMultiDrawer(repository: Repository<Namespace>, isNew: boolean, initialValue: Partial<Namespace>, onClose?: () => void): MultiDrawerProps<Namespace> {
    return {
        title: isNew ? 'New Namespace' : 'Update Namespace: ' + initialValue.name,
        tabs: [
            {
                name: '',
                component: NamespaceForm
            }
        ],
        initialValue: initialValue,
        sx: {
            width: '600px'
        },
        onClose: onClose,
        onSave: (namespace, onClose) => {
            if (isNew) {
                toast.promise(repository.create(namespace), {
                    loading: 'Creating namespace...',
                    success: 'Namespace created',
                    error: err => handleErrorMessage(err)
                }).then(() => {
                    if (onClose) {
                        onClose()
                    }
                }, console.error)
            } else {
                toast.promise(repository.update(namespace), {
                    loading: 'Updating namespace...',
                    success: 'Namespace updated',
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

