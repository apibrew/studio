import {Box, Checkbox, IconButton, Menu, MenuItem} from "@mui/material";
import {PropertyCell} from "./PropertyCell";
import {MouseEvent, useState} from "react";
import {Entity} from "@apibrew/client";
import {Resource} from "@apibrew/react";
import {DeleteForever, EditNote} from "@mui/icons-material";
import {Schema} from "../../../../types/schema";
import {useDrawer} from "../../../../hooks/use-drawer";
import {resourceDrawerMultiDrawer} from "./RecordExpand";
import {openMultiDrawer} from "../../multi-drawer/MultiDrawer.tsx";

export interface TableRecordLineProps {
    index: number
    resource: Resource
    new: boolean
    schema: Schema
    properties: string[]
    record: Entity & any
    selected: boolean
    onSelected: (selected: boolean) => void
    updated: Entity & any
    onUpdate: (updated: Entity & any) => void
    columnWidths: { [key: string]: number }
}

export function TableRecordLine(props: TableRecordLineProps) {
    const drawer = useDrawer()
    const edited = Object.keys(props.updated).length > 0 || props.record.id === 'new'
    const [chosenProperty, setChosenProperty] = useState<string | null>(null)

    const [mouseXY, setMouseXY] = useState<{ mouseX: null | number; mouseY: null | number }>({
        mouseX: null,
        mouseY: null
    });

    const handleRightClick = (event: MouseEvent<HTMLDivElement>) => {
        event.preventDefault();
        setMouseXY({
            mouseX: event.clientX - 2,
            mouseY: event.clientY - 4,
        });
    };

    const handleClose = () => {
        setMouseXY({mouseX: null, mouseY: null});
    };

    return <>
        {drawer.render()}
        <Menu
            open={mouseXY.mouseY !== null}
            onClose={handleClose}
            anchorReference="anchorPosition"
            anchorPosition={
                mouseXY.mouseY !== null && mouseXY.mouseX !== null
                    ? {top: mouseXY.mouseY, left: mouseXY.mouseX}
                    : undefined
            }
        >
            <MenuItem onClick={() => {
                props.onUpdate({
                    ...props.updated,
                    [chosenProperty!]: null
                })
                handleClose()
            }}>Set Null</MenuItem>
            <MenuItem onClick={() => {
                const updated = {...props.updated,}

                delete updated[chosenProperty!]

                props.onUpdate(updated)
                handleClose()
            }}>Revert</MenuItem>
        </Menu>
        <Box display='flex' flexDirection='row' className={`row row-body ${props.new ? 'new' : ''}`}>
            <Box width='75px' className='cell body-cell action-cell'>
                <Box className='cell-inner'>
                    {!edited && <Checkbox className="check-icon1" checked={props.selected}
                                          sx={{
                                              padding: 0
                                          }}
                                          onChange={() => props.onSelected(!props.selected)}
                                          size='small'/>}
                    {edited && <IconButton size='small' sx={{
                        padding: '6px',
                        marginLeft: '-8px',
                    }} onClick={() => {
                        props.onUpdate(undefined)
                    }}>
                        <DeleteForever/>
                    </IconButton>}
                    <IconButton onClick={() => {
                        openMultiDrawer(drawer, resourceDrawerMultiDrawer('View ' + props.resource.name, props.resource, {...props.record, ...props.updated}, () => {
                        }, updated => {
                            props.onUpdate(updated)
                        }))
                    }}>
                        <EditNote className="data-icon2"/>
                    </IconButton>
                </Box>
            </Box>
            {props.properties.map(property => (
                <PropertyCell
                    key={property}
                    openContextMenu={e => {
                        handleRightClick(e)
                        setChosenProperty(property)
                    }}
                    resource={props.resource}
                    width={props.columnWidths[property]}
                    propertyName={property}
                    property={props.schema.properties[property]}
                    new={props.record['id'] === 'new'}
                    value={props.record[property]}
                    onUpdate={value => {
                        if (value === undefined || value == null) {
                            const update = {...props.updated}
                            delete update[property]
                            props.onUpdate(update);
                        } else if (value === props.record[property]) {
                            const update = {...props.updated}
                            delete update[property]
                            props.onUpdate(update);
                        } else {
                            props.onUpdate({
                                ...props.updated,
                                [property]: value
                            })
                        }
                    }}
                    updated={props.updated[property]}
                />
            ))}
            <Box width='50px'></Box>
        </Box>
    </>
}
