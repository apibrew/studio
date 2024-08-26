import {Resource} from "@apibrew/react";
import toast from "react-hot-toast";
import {Property} from "@apibrew/client/model";
import {PropertyForm} from "../../property-form/PropertyForm";
import {getAnnotation, withAnnotation} from "../../../../util/annotation";
import {SourceMatchKey} from "../../../../util/base-annotations";
import {Repository} from "@apibrew/client";
import {MultiDrawerProps} from "../../multi-drawer/MultiDrawer.tsx";
import {handleErrorMessage} from "../../../../util/errors.ts";


export function propertyDrawerMultiDrawer(repository: Repository<Resource>, propertyPath: string, isNew: boolean, initialValue: Partial<Resource>, onClose?: () => void): MultiDrawerProps<Resource> {
    return {
        title: isNew ? 'New Property' : 'Update Property: ' + propertyPath,
        tabs: [
            {
                name: '',
                component: props => <PropertyForm
                    resource={props.value}
                    property={props.value.properties[propertyPath] || {} as Property}
                    propertyName={propertyPath}
                    onChange={property => props.onChange({
                        ...props.value,
                        properties: {
                            ...props.value.properties,
                            [propertyPath]: property
                        }
                    }, true)}
                    onChangeName={name => {
                        const updatedProperties = {...props.value.properties}

                        updatedProperties[name] = props.value.properties[propertyPath]
                        delete updatedProperties[propertyPath]

                        console.log(updatedProperties)

                        props.onChange({
                            ...props.value,
                            properties: updatedProperties
                        }, true)
                    }}
                />,
                isInitiallyValid: false
            },
        ],
        initialValue: initialValue,
        sx: {
            width: '800px'
        },
        onClose: onClose,
        onSave: async (resource, onClose) => {
            let updatedProperties = {...resource.properties}
            const property = resource.properties[propertyPath]

            if (!isNew && propertyPath !== propertyPath && getAnnotation(property.annotations, SourceMatchKey) === "") {
                updatedProperties[propertyPath] = property
                property.annotations = withAnnotation(property.annotations, SourceMatchKey, propertyPath)
            }

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
