import React from "react";
import {Property} from "@apibrew/client/model";
import {Type} from "@apibrew/client/model/resource";

export interface PropertyCellEditProps {
    property: Property
    value: any
    updated: any
    onUpdate: (updated: any) => void
}

export function PropertyCellEdit(props: PropertyCellEditProps) {
    const [updated, setUpdated] = React.useState<any>(props.value)

    switch (props.property.type) {
        case Type.STRING:
            return <input value={updated}
                          autoFocus
                          className='property-edit-input'
                          onChange={e => {
                              setUpdated(e.target.value)
                              props.onUpdate(e.target.value)
                          }}/>
    }

    return <></>
}
