import {Box, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import React, {useState} from "react";
import toast from "react-hot-toast";
import {useRepository} from "@apibrew/react";
import {useNavigate} from "react-router-dom";
import {Flow, FlowEntityInfo} from "../../../model/flow";
import {FlowForm} from "../../../components/flow-form/FlowForm";

export function FlowNew() {
    const [flow, setFlow] = useState<Flow>({
        name: '',
    } as Flow)
    const navigate = useNavigate()
    const repository = useRepository<Flow>(FlowEntityInfo)

    async function handleSave() {
        toast.promise(repository.create(flow as Flow), {
            loading: 'Saving...',
            success: 'Saved',
            error: err => err.message
        }).then(resp => {
            navigate('../' + resp.name)
        })
    }

    return <>
        <Box m={1}
             display='flex'
             flexDirection='column'
             flexGrow={1}
             height={'100%'}>
            <Box flexGrow={1}>
                <FlowForm flow={flow} onChange={setFlow}/>
            </Box>
            <Stack direction='row'
                   spacing={1}>
                <Box flexGrow={1}/>
                <Button onClick={() => handleSave()} color='success'>Save</Button>
                <Button onClick={() => navigate('..')} color='info'>Cancel</Button>
            </Stack>
        </Box>
    </>
}