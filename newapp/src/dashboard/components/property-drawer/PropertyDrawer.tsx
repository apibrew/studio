import {ValueDrawerComponent, ValueDrawerComponentProps} from "../common/ValueDrawerComponent";
import {Property} from "@apibrew/client/model";

import {PropertyForm} from "../property-form/PropertyForm";
import {Resource} from "@apibrew/react";

export interface PropertyWithName {
    name: string
    property: Property
}

export interface PropertyDrawerProps extends Omit<ValueDrawerComponentProps<PropertyWithName>, "component"> {
    resource: Resource
}

export const PropertyDrawer = (props: PropertyDrawerProps) => (
    <ValueDrawerComponent {...props}
                          component={componentProps => <PropertyForm
                              property={componentProps.value.property}
                              propertyName={componentProps.value.name}
                              resource={props.resource}
                              onChange={updated => componentProps.onChange({name: componentProps.value.name, property: updated})}
                              onChangeName={name => componentProps.onChange({name, property: componentProps.value.property})}
                          />
                          }/>
)
