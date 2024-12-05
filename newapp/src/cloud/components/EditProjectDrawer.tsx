import {Box, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import {Instance, InstanceEntityInfo} from "../model/instance.ts";
import {useState} from "react";
import Button from "@mui/material/Button";
import {useExtensionController} from "../../hooks/use-extension-controller.ts";
import {useRepository} from "@apibrew/react";
import toast from "react-hot-toast";
import {handleErrorMessage} from "../../util/errors.ts";
import {useConfirmation} from "../../components/modal/use-confirmation.tsx";
import {handleDeploymentTask} from "../util/deployment.tsx";
import {DeploymentTask, DeploymentTaskEntityInfo, Kind} from "../model/deployment-task.ts";

export interface EditProjectDrawerProps {
    instance: Instance
    onClose: () => void
}

export function EditProjectDrawer(props: EditProjectDrawerProps) {
    const repository = useRepository<Instance>(InstanceEntityInfo)
    const deploymentRepository = useRepository<DeploymentTask>(DeploymentTaskEntityInfo)

    const [instance, setInstance] = useState<Instance>(props.instance)
    const confirmation = useConfirmation()

    const extensionController = useExtensionController()

    function updateInstance() {
        toast.promise(repository.update(instance), {
            loading: 'Updating project...',
            success: (updatedInstance) => {
                return `Instance ${updatedInstance.name} updated`
            },
            error: err => handleErrorMessage(err)
        }).then(() => {
            props.onClose()
        })
    }

    function rebuildInstance() {
        handleDeploymentTask(deploymentRepository, instance, Kind.UPGRADE).then(() => {
            props.onClose()
        })
    }

    function destroyInstance() {
        handleDeploymentTask(deploymentRepository, instance, Kind.DESTROY).then(() => {
            props.onClose()
        })
    }

    return <Box m={3}
                width='600px'>
        {confirmation.render()}
        <Typography variant='h5'>
            Update project: {instance.name}
        </Typography>

        <Box m={2}>
            <Typography variant='body1'>
                Projects are a way to organize your resources in the cloud. You can create a project and then add
                resources to it.
            </Typography>

            <Typography variant='body1'>
                You can also share a project with other users in your organization.
            </Typography>

            <Box mt={2}>
                <TextField
                    label='Project Title'
                    fullWidth
                    value={instance.title}
                    onChange={e => {
                        setInstance({
                            ...instance,
                            title: e.target.value
                        })
                    }}
                />

                <TextField
                    label='Project Description'
                    fullWidth
                    multiline
                    rows={4}
                    value={instance.description}
                    onChange={e => {
                        setInstance({
                            ...instance,
                            description: e.target.value
                        })
                    }}
                />

                {extensionController.isExtensionController && <>
                    <TextField
                        label='Owner'
                        fullWidth
                        value={instance.owner}
                        onChange={e => {
                            setInstance({
                                ...instance,
                                owner: e.target.value
                            })
                        }}
                    />
                </>}
            </Box>
        </Box>
        <Box m={2} display='flex' justifyContent='flex-end'>
            <Button
                sx={{
                    marginLeft: 2
                }}
                variant='contained'
                color='error'
                onClick={() => {
                    confirmation.open({
                        kind: 'danger',
                        title: 'Are you sure to destroy project?',
                        message: 'This will destroy your project and all data will be lost. This is irreversible.',
                        onConfirm: () => {
                            destroyInstance()
                        }
                    })
                }}
            >
                Destroy Project
            </Button>
            <Box flexGrow={1}/>
            <Button
                variant='contained'
                color='secondary'
                onClick={() => {
                    props.onClose()
                }}
            >
                Cancel
            </Button>
            <Button
                sx={{
                    marginLeft: 2
                }}
                variant='contained'
                color='warning'
                onClick={() => {
                    rebuildInstance()
                }}
            >
                Rebuild Project
            </Button>
            <Button
                sx={{
                    marginLeft: 2
                }}
                variant='contained'
                color='primary'
                onClick={() => {
                    updateInstance()
                }}
            >
                Update Project
            </Button>
        </Box>
    </Box>
}
