import {TreeItem} from "@mui/x-tree-view";
import {ArrowDownward, ArrowUpward, ListAlt, Remove, ShoppingCartTwoTone} from "@mui/icons-material";
import React from "react";
import {Resource} from "@apibrew/react";
import {Property} from "@apibrew/client/model";
import {IconButton} from "@mui/material";

export interface SchemaPropertyTreeItemProps {
    resource: Resource
    property: Property
    path: string
    propertyName: string
    onClick: () => void
    onRemove: () => void
    onMoveUp: () => void
    onMoveDown: () => void
    isFirstChild: boolean
    isLastChild: boolean
}

export function SchemaPropertyTreeItem(props: SchemaPropertyTreeItemProps) {
    let label = props.propertyName

    label += ': ' + props.property.type.toLowerCase() + ''

    if (props.property.type === 'STRUCT') {
        label += '[' + props.property.typeRef + ']'
    }

    if (props.property.type === 'REFERENCE') {
        label += '[' + props.property.reference + ']'
    }

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
            icon={<ListAlt/>}
            nodeId={props.path + '.' + props.propertyName}

            label={<>
                <span style={{
                    display: 'inline-block',
                    minWidth: props.path !== '$' ? '400px' : '416px'
                }}>{label}</span>
                <IconButton disabled={props.isFirstChild} onClick={(e) => {
                    e.stopPropagation()

                    props.onMoveUp()
                }} color='primary' size='small'>
                    <ArrowUpward fontSize='small'/>
                </IconButton>
                <IconButton disabled={props.isLastChild} onClick={(e) => {
                    e.stopPropagation()

                    props.onMoveDown()
                }} color='primary' size='small'>
                    <ArrowDownward fontSize='small'/>
                </IconButton>
                <IconButton onClick={(e) => {
                    e.stopPropagation()

                    props.onRemove()
                }} color='error' size='small'>
                    <Remove fontSize='small'/>
                </IconButton>
            </>}/>
    )
}
