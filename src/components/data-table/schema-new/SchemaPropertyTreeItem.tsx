import {TreeItem} from "@mui/x-tree-view";
import {ShoppingCartTwoTone} from "@mui/icons-material";
import React from "react";
import {Resource} from "@apibrew/react";
import {Property} from "@apibrew/client/model";

export interface SchemaPropertyTreeItemProps {
    resource: Resource
    property: Property
    path: string
    propertyName: string
    onClick: () => void
}

export function SchemaPropertyTreeItem(props: SchemaPropertyTreeItemProps) {
    let label = props.propertyName

    label += ': ' + props.property.type.toLowerCase() + ''

    let alt: string[] = []

    if (props.property.required) {
        alt.push('required')
    }

    if (props.property.unique) {
        alt.push('unique')
    }

    if (props.property.immutable) {
        alt.push('immutable')
    }

    if (alt.length > 0) {
        label += ' (' + alt.join(', ') + ')'
    }

    return (
        <TreeItem
            onClick={props.onClick}
            icon={<ShoppingCartTwoTone/>}
            nodeId={props.path + '.' + props.propertyName}
            label={label}/>
    )
}
