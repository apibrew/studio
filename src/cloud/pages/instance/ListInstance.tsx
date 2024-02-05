import {Instance, InstanceEntityInfo} from "../../model/instance";
import {LoadingOverlay} from "../../../components/LoadingOverlay";
import {useDataProvider} from "../../../components/data-provider/use-data-provider";
import React from "react";
import {Box, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import {checkResourceAccess} from "../../../util/authorization";
import {Direction, Resource, useTokenBody, useWatcher} from "@apibrew/react";
import {ExtensionResource} from "@apibrew/client/model/extension";
import {Operation} from "@apibrew/client/model/permission";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

export function ListInstance() {
    const navigate = useNavigate()

    const wi = useWatcher(InstanceEntityInfo)

    const data = useDataProvider<Instance>(InstanceEntityInfo, {
        sorting: [{property: 'deploymentStatus', direction: Direction.ASC}],
        limit: 100,
    }, wi)

    const tokenBody = useTokenBody()
    const isExtensionController = checkResourceAccess(tokenBody.permissions, ExtensionResource as Resource, Operation.FULL)

    if (data.loading) {
        return <LoadingOverlay/>
    }

    const instances = data.records

    instances.sort((a, b) => {
        if (a.auditData?.createdOn && b.auditData?.createdOn) {
            return Date.parse(b.auditData.createdOn as string) - Date.parse(a.auditData.createdOn as string)
        } else {
            return 0
        }
    })

    return <Box width='100%'>
        <Box height='600px' width='100%' overflow='auto'>
            <Table width='100%'>
                <TableHead>
                    <TableRow>
                        {isExtensionController && <TableCell>Owner</TableCell>}
                        {isExtensionController && <TableCell>Creation Date</TableCell>}
                        <TableCell>Name</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {instances.map((instance) => (
                        <TableRow
                            key={instance.id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}>
                            {isExtensionController && <TableCell>
                                <Typography variant="body2">{instance.owner}</Typography>
                            </TableCell>}
                            {isExtensionController && <TableCell>
                                <Typography variant="body2">{instance.auditData?.createdOn as string}</Typography>
                            </TableCell>}
                            <TableCell>
                                <Typography variant="body2">{instance.name}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2">{instance.title}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2">{instance.description}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2">{instance.deploymentStatus}</Typography>
                            </TableCell>
                            <TableCell>
                                {instance.deploymentStatus !== 'DESTROYED' && <Button onClick={() => {
                                    navigate(`/cloud/instances/${instance.id}/goto`)
                                }}>goto</Button>}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
        {data.renderPagination()}
    </Box>
}