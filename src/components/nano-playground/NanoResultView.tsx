import {Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";

export interface NanoResultViewProps {
    result: any
}

export function NanoResultView(props: NanoResultViewProps) {
    if (typeof props.result == 'object' && props.result.length) {
        return <ArrayView {...props}/>
    }

    return <>
        {JSON.stringify(props.result)}
    </>
}

export function ArrayView(props: NanoResultViewProps) {
    const arr = props.result as any[]

    const keys: string[] = []

    for (const elem of arr) {
        if (typeof elem === 'object') {
            for (const key of Object.keys(elem)) {
                if (keys.indexOf(key) === -1) {
                    keys.push(key)
                }
            }
        }
    }

    return <>
        <Typography>{arr.length} items</Typography>
        <Table width='500px'>
            {keys.length > 0 && <TableHead>
                <TableRow>
                    {keys.map((key, index) => <TableCell key={index}>{key}</TableCell>)}
                </TableRow>
            </TableHead>}
            <TableBody>
                {arr.map((elem, index) => <TableRow key={index}>
                    {keys.map((key, index) => <TableCell key={index}>{elem[key]}</TableCell>)}
                    {keys.length === 0 && <TableCell>{elem}</TableCell>}
                </TableRow>)}
            </TableBody>
        </Table>
    </>
}