import {Resource} from "@apibrew/react";
import {TableContainer} from "./table/TableContainer";
import './DataTable.scss'
import React from "react";
import {useDrawer} from "../../hooks/use-drawer";

export interface DataTableProps {
    resource: Resource
    reloadResource?: () => void
}

export function DataTable(props: DataTableProps) {
    const drawer = useDrawer()

    return <>
        {drawer.render()}
        <TableContainer
            resource={props.resource}
        />
    </>
}
