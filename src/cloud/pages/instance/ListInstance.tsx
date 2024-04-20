import {Instance, InstanceEntityInfo} from "../../model/instance";
import {LoadingOverlay} from "../../../components/LoadingOverlay";
import {useDataProvider} from "../../../components/data-provider/use-data-provider";
import React from "react";
import {Box, Table, TableBody, TableCell, TableHead, TableRow, Tooltip, Typography} from "@mui/material";
import {checkResourceAccess} from "../../../util/authorization";
import {Direction, Resource, useRecords, useRepository, useTokenBody, useWatcher} from "@apibrew/react";
import {ExtensionResource} from "@apibrew/client/model/extension";
import {BooleanExpression, Operation} from "@apibrew/client/model/permission";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import {DeploymentTask, DeploymentTaskEntityInfo, Kind} from "../../model/deployment-task";
import toast from "react-hot-toast";
import {InstanceHealthCheck, InstanceHealthCheckEntityInfo} from "../../model/instance-health-check";

export function ListInstance() {
    const navigate = useNavigate()

    const wi = useWatcher(InstanceEntityInfo)
    const deploymentTaskRepository = useRepository<DeploymentTask>(DeploymentTaskEntityInfo)
    const instanceHalthCheck = useRecords<InstanceHealthCheck>(InstanceHealthCheckEntityInfo, {
        limit: 10000
    })

    const data = useDataProvider<Instance>(InstanceEntityInfo, {
        sorting: [{property: 'deploymentStatus', direction: Direction.ASC}],
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
        limit: 100,
        resolveReferences: ['$.plan']
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

    console.log(instanceHalthCheck)

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
                        const healthData = instanceHalthCheck?.find(hc => hc.instance.id === instance.id)

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
                                {healthData && <Typography variant="body2">
                                    {healthData.health}
                                    &nbsp;
                                    {(healthData.details as any)?.version?.version}
                                </Typography>}
                                {!healthData && <Typography variant="body2">
                                    No Data
                                </Typography>}
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
