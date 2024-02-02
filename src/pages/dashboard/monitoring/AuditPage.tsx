import {AuditLog, Direction, Resource, useRecords} from "@apibrew/react";
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
import {useMemo, useState} from "react";

export function AuditPage() {
    const modal = useModal()
    const [resource, setResource] = useState<Resource>()
    const filters = useMemo<{ [key: string]: string }>(() => {
        const result: { [key: string]: string } = {}

        if (resource?.id) {
            result['resource'] = resource.id as string
        }

        return result
    }, [resource?.id])

    const auditLogs = useRecords<AuditLog>(AuditLogEntityInfo, {
        limit: 1000,
        sorting: [{property: 'time', direction: Direction.DESC}],
        filters: filters
    })

    if (!auditLogs) {
        return <LoadingOverlay/>
    }

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
                        value={resource ? resource.namespace.name + '/' + resource.name : undefined}
                        onChange={(e, resource) => setResource(resource)}/>
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
                        }}>
                        <MenuItem>Any</MenuItem>
                        <MenuItem>Create</MenuItem>
                        <MenuItem>Update</MenuItem>
                        <MenuItem>Delete</MenuItem>
                        <MenuItem>List/Get</MenuItem>
                    </Select>
                </Box>
            </Stack>
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
                    {auditLogs?.map((auditLog, index) => (
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
        </Box>
    )
}