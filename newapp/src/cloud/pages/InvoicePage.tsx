import {InstanceEntityInfo} from "../model/instance";
import {LoadingOverlay} from "common";

import {Box, Card, IconButton, Stack, Typography} from "@mui/material";
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

export function InvoicesPage() {
    const drawer = useDrawer()

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
                                    <PictureAsPdf/> invoice-{item.id}.pdf
                                </TableCell>
                                <TableCell>{item.auditData?.createdOn}</TableCell>
                                <TableCell>{item.amount / 100} USD</TableCell>
                                <TableCell>{item.status}</TableCell>
                                <TableCell>
                                    {item.status === 'PENDING' && <IconButton>
                                        <FileDownload/>
                                    </IconButton>}
                                    {item.status === 'PENDING' && <Button color='primary'>
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
