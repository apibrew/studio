import {Box, Typography} from "@mui/material";
import TextField from "@mui/material/TextField";
import {Instance, InstanceEntityInfo} from "../model/instance.ts";
import {useState} from "react";
import Button from "@mui/material/Button";
import {useExtensionController} from "../../hooks/use-extension-controller.ts";
import {useRepository, useTokenBody} from "@apibrew/react";
import toast from "react-hot-toast";
import {handleErrorMessage} from "../../util/errors.ts";

export interface NewProjectDrawerProps {
    onClose: () => void
}

export function NewProjectDrawer(props: NewProjectDrawerProps) {
    const tokenBody = useTokenBody()
    const repository = useRepository<Instance>(InstanceEntityInfo)

    const [instance, setInstance] = useState<Instance>({
        name: '',
        title: '',
        description: '',
        owner: tokenBody.username,
    } as Instance)

    const extensionController = useExtensionController()

    function createInstance() {
        toast.promise(repository.create(instance), {
            loading: 'Creating project...',
            success: (createdInstance) => {
                return `Instance ${createdInstance.name} created`
            },
            error: err => handleErrorMessage(err)
        })
    }

    return <Box m={3}
                width='600px'>
        <Typography variant='h5'>
            Create a new project
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
                color='primary'
                onClick={() => {
                    createInstance()
                    props.onClose()
                }}
            >
                Create Project
            </Button>
        </Box>
    </Box>
}
