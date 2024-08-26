import {Resource} from "@apibrew/react";
import toast from "react-hot-toast";
import {Property} from "@apibrew/client/model";
import {Repository} from "@apibrew/client";
import {PropertyForm} from "../property-form/PropertyForm.tsx";
import {handleErrorMessage} from "../../../util/errors.ts";
import {MultiDrawerProps, TabComponentProps} from "../multi-drawer/MultiDrawer.tsx";
import {PropertyDetailsForm} from "../property-form/PropertyDetailsForm.tsx";
import {PropertyAdvancedForm} from "../property-form/PropertyAdvancedForm.tsx";
import {getAnnotation, withAnnotation} from "../../../util/annotation.ts";
import {SourceMatchKey} from "../../../util/base-annotations.ts";


export function propertyDrawerMultiDrawer(repository: Repository<Resource>, propertyPath: string, isNew: boolean, initialValue: Partial<Resource>, onClose?: () => void): MultiDrawerProps<Resource> {
    function handleLocalPropertyUpdate(properties: Resource['properties'], propertyName: string, property: Property) {
        const updatedProperties = {...properties}

        const existingProperty = updatedProperties[propertyPath]
        delete updatedProperties[propertyPath]
        updatedProperties[propertyName] = {...existingProperty, ...property}
        console.log(updatedProperties, propertyPath, propertyName)
        propertyPath = propertyName

        if (getAnnotation(property.annotations, SourceMatchKey) === "") {
            property.annotations = withAnnotation(property.annotations, SourceMatchKey, propertyPath)
        }
        return updatedProperties;
    }

    function handlePropertyUpdate(properties: Resource['properties'], propertyName: string, property: Property, props: TabComponentProps<Resource>) {
        const updatedProperties = handleLocalPropertyUpdate(properties, propertyName, property);

        props.onChange({
            ...props.value,
            properties: updatedProperties
        }, true)
    }

    if (isNew) {
        initialValue.properties = handleLocalPropertyUpdate(initialValue.properties!, propertyPath, {
            type: 'STRING'
        } as Property);
    }

    return {
        title: isNew ? 'Add Property' : 'Update Property: ' + propertyPath,
        tabs: [
            {
                name: 'Main',
                component: props => <PropertyForm
                    resource={props.value}
                    property={props.value.properties[propertyPath]}
                    propertyName={propertyPath}
                    onChange={(propertyName, property) => {
                        handlePropertyUpdate(props.value.properties, propertyName, property, props);
                    }}
                />,
            },
            {
                name: 'Details',
                component: props => <PropertyDetailsForm
                    resource={props.value}
                    property={props.value.properties[propertyPath]}
                    onChange={(property) => {
                        handlePropertyUpdate(props.value.properties, propertyPath, property, props);
                    }}
                />,
            },
            {
                name: 'Advanced',
                component: props => <PropertyAdvancedForm
                    resource={props.value}
                    property={props.value.properties[propertyPath]}
                    onChange={(property) => {
                        handlePropertyUpdate(props.value.properties, propertyPath, property, props);
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
