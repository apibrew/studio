import {Instance, InstanceEntityInfo} from "../../model/instance";
import {LoadingOverlay} from "../../../components/LoadingOverlay";
import {useDataProvider} from "../../../components/data-provider/use-data-provider";
import React from "react";
import {Box, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import {checkResourceAccess} from "../../../util/authorization";
import {Direction, Resource, useTokenBody} from "@apibrew/react";
import {ExtensionResource} from "@apibrew/client/model/extension";
import {Operation} from "@apibrew/client/model/permission";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";

export function ListInstance() {
    const navigate = useNavigate()
    const data = useDataProvider<Instance>(InstanceEntityInfo, {
        sorting: [{property: 'deploymentStatus', direction: Direction.ASC}]
    })
    const tokenBody = useTokenBody()
    const isExtensionController = checkResourceAccess(tokenBody.permissions, ExtensionResource as Resource, Operation.FULL)

    if (data.loading) {
        return <LoadingOverlay/>
    }

    return <Box width='100%'>
        <Box height='600px' width='100%' overflow='auto'>
            <Table width='100%'>
                <TableHead>
                    <TableRow>
                        {isExtensionController && <TableCell>Owner</TableCell>}
                        <TableCell>Name</TableCell>
                        <TableCell>Title</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.records.map((instance) => (
                        <TableRow
                            key={instance.id}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            {isExtensionController && <TableCell>
                                <Typography variant="body2">{instance.owner}</Typography>
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