import {Instance, InstanceEntityInfo} from "../../model/instance";
import {LoadingOverlay} from "common";
import {useDataProvider} from "app/src/components/data-provider/use-data-provider";

import {Box, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography} from "@mui/material";
import {checkResourceAccess} from "app/src/util/authorization";
import {Direction, Resource, useRepository, useTokenBody, useWatcher} from "@apibrew/react";
import {ExtensionResource} from "@apibrew/client/model/extension";
import {BooleanExpression, Operation} from "@apibrew/client/model/permission";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {DeploymentTask, DeploymentTaskEntityInfo, Kind} from "../../model/deployment-task";
import toast from "react-hot-toast";

export function ListInstance() {
    const navigate = useNavigate()

    const wi = useWatcher(InstanceEntityInfo)
    const deploymentTaskRepository = useRepository<DeploymentTask>(DeploymentTaskEntityInfo)

    const data = useDataProvider<Instance>(InstanceEntityInfo, {
        query: {
            not: {
                equal: {
                    left: {
                        property: 'deploymentStatus'
                    },
                    right: {
                        value: 'DESTROYED'
                    }
                }
            }
        } as unknown as BooleanExpression,
        limit: 1000,
        resolveReferences: ['$.plan'],
        sorting: [{
            property: 'auditData.createdOn',
            direction: Direction.DESC
        }]
    }, wi)

    const tokenBody = useTokenBody()
    const isExtensionController = checkResourceAccess(tokenBody.permissions as any, ExtensionResource as Resource, Operation.FULL)

    if (data.loading) {
        return <LoadingOverlay/>
    }

    const instances = data.records

    const handleDeploymentTask = (instance: Instance, kind: Kind) => () => {
        const promise = deploymentTaskRepository.create({
            user: instance.owner,
            instance: instance,
            kind: kind,
            status: "PENDING"
        } as DeploymentTask)

        let loadingMessage = ''
        let successMessage = '';

        switch (kind) {
            case Kind.DEPLOY:
                loadingMessage = 'Deploying...'
                successMessage = 'Deployed!'
                break;
            case Kind.UPGRADE:
                loadingMessage = 'Upgrading...'
                successMessage = 'Upgraded!'
                break;
            case Kind.DESTROY:
                loadingMessage = 'Destroying...'
                successMessage = 'Destroyed!'
                break;
            case Kind.RESTART:
                loadingMessage = 'Restarting...'
                successMessage = 'Restarted!'
                break;
        }

        return toast.promise(
            promise,
            {
                loading: loadingMessage,
                success: <b>{successMessage}</b>,
                error: 'Failed to save settings - todo fix',
            }
        );
    }

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
                        <TableCell>Plan</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Health</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {instances.map((instance) => {
                        return <TableRow
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
                                <Typography variant="body2">{instance.plan?.name}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2">{instance.deploymentStatus}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2">
                                    {instance.backendVersion}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                {instance.deploymentStatus !== 'DESTROYED' && <Button
                                    color='secondary'
                                    disabled={false}
                                    variant="contained"
                                    onClick={handleDeploymentTask(instance, Kind.UPGRADE)}
                                >
                                    <Tooltip title='It will rebuild instance and update it to latest version'>
                                        <span>Rebuild</span>
                                    </Tooltip>
                                </Button>}
                                &nbsp;
                                {instance.deploymentStatus !== 'DESTROYED' && <Button onClick={() => {
                                    navigate(`/cloud/instances/${instance.id}/goto`)
                                }}>goto</Button>}
                            </TableCell>
                        </TableRow>
                    })}
                </TableBody>
            </Table>
        </Box>
        {data.renderPagination()}
    </Box>
}
