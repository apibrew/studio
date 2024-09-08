import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import IconButton from "@mui/material/IconButton";
import {DeleteForever} from "@mui/icons-material";
import {Invoice} from "../model/invoice.ts";

export interface InvoiceViewProps {
    invoice: Invoice
    onUpdate?: (invoice: Invoice) => void
}

export function InvoiceView(props: InvoiceViewProps) {
    const invoice = props.invoice;

    const amount = invoice.amount

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell>Qty</TableCell>
                    <TableCell>Unit price</TableCell>
                    <TableCell>Total</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow
                    sx={{'&:last-child td, &:last-child th': {border: 0}}}
                >
                    <TableCell>
                        <Typography variant="body2">
                            <div><b>Account</b>: {invoice.user}</div>
                            <div><b>Plan change</b>: {invoice.plan?.name}</div>
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="body2">{invoice.monthCount}</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="body2">{invoice.plan.amount / 100} USD</Typography>
                    </TableCell>
                    <TableCell>
                        <Typography
                            variant="body2">{invoice.plan.amount * invoice.monthCount / 100} USD</Typography>
                        {props.onUpdate && <IconButton onClick={() => {
                            props.onUpdate!({
                                ...invoice,
                            })
                        }}>
                            <DeleteForever/>
                        </IconButton>}
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={3}>
                        <Typography align='right'
                                    variant="body2">
                            <b>Grand Total</b>
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="body2">
                            <b>{amount / 100} USD</b>
                        </Typography>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}
