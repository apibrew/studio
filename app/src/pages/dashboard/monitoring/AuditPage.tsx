import {AuditLog} from "@apibrew/react";
import {AuditLogEntityInfo} from "@apibrew/client/model/audit-log";
import {
    Box,
    FormLabel,
    IconButton,
    MenuItem,
    Select,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tooltip
} from "@mui/material";
import {LoadingOverlay} from "../../../components/LoadingOverlay";
import {label} from "../../../util/record";
import {Search} from "@mui/icons-material";
import {useModal} from "../../../components/modal/use-modal";
import {AuditLogViewMore} from "../../../components/audit-log/AuditLogViewMore";
import {ResourceSelect} from "../../../components/ResourceSelect";
import {useDataProvider} from "../../../components/data-provider/use-data-provider";
import Button from "@mui/material/Button";

export function AuditPage() {
    const modal = useModal()

    const dataProvider = useDataProvider<AuditLog>(AuditLogEntityInfo)

    return (
        <Box>
            {modal.render()}
            <Stack direction='row' spacing={3} m={1}>
                <Box>
                    <FormLabel sx={{
                        marginRight: '5px'
                    }}>Resource:</FormLabel>
                    <ResourceSelect
                        addAny={true}
                        size='small'
                        variant='standard'
                        sx={{
                            width: '150px'
                        }}
                        value={dataProvider.listParams.filters?.namespace + '/' + dataProvider.listParams.filters?.resource}
                        onChange={(e) => {
                            if (!e.target.value) {
                                dataProvider.updateParams({
                                    filters: {
                                        ...dataProvider.listParams.filters,
                                        namespace: '',
                                        resource: '',
                                    }
                                })
                                return
                            }
                            const [namespace, resource] = e.target.value.split('/')
                            dataProvider.updateParams({
                                filters: {
                                    ...dataProvider.listParams.filters,
                                    namespace: namespace,
                                    resource: resource,
                                }
                            })
                        }}
                    />
                </Box>
                <Box>
                    <FormLabel sx={{
                        marginRight: '5px'
                    }}>Operation:</FormLabel>
                    <Select
                        size='small'
                        variant='standard'
                        sx={{
                            width: '150px'
                        }}
                        value={dataProvider.listParams.filters?.operation || ''}
                        onChange={e => {
                            dataProvider.updateParams({
                                filters: {
                                    ...dataProvider.listParams.filters,
                                    operation: e.target.value as string
                                }
                            })
                        }}>
                        <MenuItem value=''>Any</MenuItem>
                        <MenuItem value='CREATE'>Create</MenuItem>
                        <MenuItem value='UPDATE'>Update</MenuItem>
                        <MenuItem value='DELETE'>Delete</MenuItem>
                        <MenuItem value='LIST'>List/Get</MenuItem>
                    </Select>
                </Box>
                <Box flexGrow={1}/>
                <Box>
                    <Button onClick={dataProvider.refresh} variant='contained'>Refresh</Button>
                </Box>
            </Stack>
            {dataProvider.loading && <LoadingOverlay/>}
            {!dataProvider.loading && <>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Time</TableCell>
                            <TableCell>Namespace/Resource</TableCell>
                            <TableCell>Operation</TableCell>
                            <TableCell>Record Id</TableCell>
                            <TableCell>Record label</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {dataProvider.records.map((auditLog, index) => (
                            <TableRow key={auditLog.id}>
                                <TableCell>
                                    {index + 1}
                                </TableCell>
                                <TableCell>{auditLog.time?.toString()}</TableCell>
                                <TableCell>{auditLog.namespace}/{auditLog.resource}</TableCell>
                                <TableCell>{auditLog.operation}</TableCell>
                                <TableCell>{auditLog.id}</TableCell>
                                <TableCell>{label(auditLog.properties)}</TableCell>
                                <TableCell>
                                    <Tooltip title='View More'>
                                        <IconButton
                                            onClick={() => {
                                                modal.open(<AuditLogViewMore auditLog={auditLog}
                                                                             onClose={modal.close}/>)
                                            }}
                                            size='small'>
                                            <Search fontSize='small'/>
                                        </IconButton>
                                    </Tooltip>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                {dataProvider.renderPagination()}
            </>}
        </Box>
    )
}