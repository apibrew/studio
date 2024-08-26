import {Resource} from "@apibrew/react";
import toast from "react-hot-toast";
import {Property} from "@apibrew/client/model";
import {Repository} from "@apibrew/client";
import {PropertyForm} from "../property-form/PropertyForm.tsx";
import {getAnnotation, withAnnotation} from "../../../util/annotation.ts";
import {SourceMatchKey} from "../../../util/base-annotations.ts";
import {handleErrorMessage} from "../../../util/errors.ts";
import {MultiDrawerProps, TabComponentProps} from "../multi-drawer/MultiDrawer.tsx";
import {PropertyDetailsForm} from "../property-form/PropertyDetailsForm.tsx";
import {PropertyAdvancedForm} from "../property-form/PropertyAdvancedForm.tsx";


export function propertyDrawerMultiDrawer(repository: Repository<Resource>, propertyPath: string, isNew: boolean, initialValue: Partial<Resource>, onClose?: () => void): MultiDrawerProps<Resource> {
    const initialProperties = initialValue.properties || {}

    function handlePropertyUpdate(propertyName: string, property: Property, props: TabComponentProps<Resource>) {
        const updatedProperties = {...initialProperties}
        propertyPath = propertyName

        const existingProperty = updatedProperties[propertyPath]
        delete updatedProperties[propertyPath]
        updatedProperties[propertyName] = {...existingProperty, ...property}

        props.onChange({
            ...props.value,
            properties: updatedProperties
        }, true)
    }

    const defaultProperty = {
        type: 'STRING'
    }

    return {
        title: isNew ? 'Add Property' : 'Update Property: ' + propertyPath,
        tabs: [
            {
                name: 'Main',
                component: props => <PropertyForm
                    resource={props.value}
                    property={props.value.properties[propertyPath] || {...defaultProperty} as Property}
                    propertyName={propertyPath}
                    onChange={(propertyName, property) => {
                        handlePropertyUpdate(propertyName, property, props);
                    }}
                />,
            },
            {
                name: 'Details',
                component: props => <PropertyDetailsForm
                    resource={props.value}
                    property={props.value.properties[propertyPath] || {...defaultProperty} as Property}
                    onChange={(property) => {
                        handlePropertyUpdate(propertyPath, property, props);
                    }}
                />,
            },
            {
                name: 'Advanced',
                component: props => <PropertyAdvancedForm
                    resource={props.value}
                    property={props.value.properties[propertyPath] || {...defaultProperty} as Property}
                    onChange={(property) => {
                        handlePropertyUpdate(propertyPath, property, props);
                    }}
                />,
            },
        ],
        initialValue: initialValue,
        sx: {
            width: '800px'
        },
        onClose: onClose,
        onSave: async (resource, onClose) => {
            let updatedProperties = {...resource.properties}
            let property = resource.properties[propertyPath]

            if (property === undefined) {
                property = defaultProperty as Property
            }

            updatedProperties[propertyPath] = property

            if (!isNew && propertyPath !== propertyPath && getAnnotation(property.annotations, SourceMatchKey) === "") {
                property.annotations = withAnnotation(property.annotations, SourceMatchKey, propertyPath)
            }

            console.log(updatedProperties)

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
