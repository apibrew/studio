import {PropertyFormProps, registerCustomPropertyForm} from "core";
import {Type} from "@apibrew/client/model/resource";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";

const TableEditor = (props: PropertyFormProps<any[]>) => {
    const value = props.value || []
    const headers = value.length > 0 ? Object.keys(value[0]) : []

    return <Table>
        <TableHead>
            <TableRow>
                {headers.map(header => <TableCell>{header}</TableCell>)}
            </TableRow>
        </TableHead>
        <TableBody>
            {value.map(row => <TableRow>
                {headers.map(header => <TableCell>{row[header]}</TableCell>)}
            </TableRow>)}
        </TableBody>

    </Table>
}

registerCustomPropertyForm<any[]>("Table Editor", Type.LIST, TableEditor)
