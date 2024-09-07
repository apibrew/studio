import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import IconButton from "@mui/material/IconButton";
import {ArrowRight, DeleteForever} from "@mui/icons-material";
import {Invoice} from "../model/invoice.ts";

export interface InvoiceViewProps {
  invoice: Invoice
  onUpdate?: (invoice: Invoice) => void
}

export function InvoiceView(props: InvoiceViewProps) {
  const invoice = props.invoice;

  const amount = invoice.items?.reduce((acc, item) => acc + item.plan.amount * item.monthCount, 0) ?? 0

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
        {invoice.items?.map((item, index) => (
          <TableRow
            key={item.instance.id}
            sx={{'&:last-child td, &:last-child th': {border: 0}}}
          >
            <TableCell>
              <Typography variant="body2">
                <div><b>Instance</b>: {item.instance.name}</div>
                {item.instance.plan?.name !== item.plan?.name &&
                  <div><b>Plan change</b>: {item.instance.plan?.name}
                    <ArrowRight/> {item.plan?.name}
                  </div>}
                {item.instance.paidPlanUntil &&
                  <div><b>Was paid until (before invoice
                    execution)</b>: {item.instance.paidPlanUntil as string}
                  </div>}
              </Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2">{item.monthCount}</Typography>
            </TableCell>
            <TableCell>
              <Typography variant="body2">{item.plan.amount / 100} USD</Typography>
            </TableCell>
            <TableCell>
              <Typography
                variant="body2">{item.plan.amount * item.monthCount / 100} USD</Typography>
              {props.onUpdate && <IconButton onClick={() => {
                props.onUpdate!({
                  ...invoice,
                  items: invoice.items.filter((_, i) => i !== index)
                })
              }}>
                <DeleteForever/>
              </IconButton>}
            </TableCell>
          </TableRow>
        ))}
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
