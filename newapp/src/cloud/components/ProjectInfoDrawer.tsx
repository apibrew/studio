import {Box, Typography} from "@mui/material";
import {Instance} from "../model/instance.ts";
import Button from "@mui/material/Button";
import {useConfirmation} from "../../components/modal/use-confirmation.tsx";

export interface ProjectInfoDrawerProps {
    instance: Instance
    onClose: () => void
}

export function ProjectInfoDrawer(props: ProjectInfoDrawerProps) {
    const confirmation = useConfirmation()

    return <Box m={3}
                width='600px'>
        {confirmation.render()}
        <Typography variant='h5'>
            Project Info: {props.instance.name}
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

            </Box>
        </Box>
        <Box m={2} display='flex' justifyContent='flex-end'>
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
        </Box>
    </Box>
}
