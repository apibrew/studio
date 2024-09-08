import {InstanceEntityInfo} from "../model/instance";
import {LoadingOverlay} from "common";

import {Badge, Box, Card, IconButton, Stack, Typography} from "@mui/material";
import {Direction, useWatcher} from "@apibrew/react";
import Button from "@mui/material/Button";
import {FileDownload, PictureAsPdf, Refresh} from "@mui/icons-material";
import {useDataProvider} from "../../dashboard/components/data-provider/use-data-provider.tsx";
import {useDrawer} from "../../hooks/use-drawer.tsx";
import {Invoice, InvoiceEntityInfo} from "../model/invoice.ts";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import {useNavigate} from "react-router-dom";

export function InvoicesPage() {
    const drawer = useDrawer()
    const navigate = useNavigate()
    const wi = useWatcher(InstanceEntityInfo)

    const params = {
        limit: 1000,
        resolveReferences: ['$.plan'],
        sorting: [{
            property: 'auditData.createdOn',
            direction: Direction.DESC
        }]
    }

    const data = useDataProvider<Invoice>(InvoiceEntityInfo, params, wi);

    const invoices = data.records || []

    return <Box width='100%'>
        {drawer.render()}
        <Box justifyContent='space-between' display='flex'>
            <Typography variant='h5'>Invoices ({invoices && invoices.length})</Typography>
            <Stack spacing={2} direction='row'>
                <Button
                    size='small'
                    color='secondary'
                    variant='contained'
                    onClick={() => {
                        data.refresh()
                    }}
                >
                    <Refresh/>
                    Refresh
                </Button>
            </Stack>
        </Box>

        {data.loading && <LoadingOverlay/>}

        <Box mt={2}>
            <Card>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Invoice number</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {invoices.map((item) => {
                            return <TableRow key={item.id}>
                                <TableCell>
                                    <PictureAsPdf color='error'/> Invoice {item.id.substring(0, 8)}
                                </TableCell>
                                <TableCell>{new Date(Date.parse(item.auditData?.createdOn!)).toLocaleDateString('en-US', {
                                    year: 'numeric', month: 'long', day: 'numeric'
                                })}</TableCell>
                                <TableCell>{item.amount / 100} USD</TableCell>
                                <TableCell>
                                    <Badge color='error'>
                                        {item.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    {item.status === 'PAID' && <IconButton>
                                        <FileDownload/>
                                    </IconButton>}
                                    {item.status === 'PENDING' && <Button
                                        onClick={() => {
                                            navigate(`/cloud/payment/${item?.payment!.id}`)
                                        }}
                                        color='primary'>
                                        Pay
                                    </Button>}
                                </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </Card>
        </Box>
    </Box>
}
