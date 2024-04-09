import React, {useEffect, useState} from "react";
import {Box, Stack, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {LoadingOverlay} from "../../../components/LoadingOverlay";
import {useRepository} from "@apibrew/react";
import {useNavigate, useParams} from "react-router-dom";
import toast from "react-hot-toast";
import {Flow, FlowEntityInfo} from "../../../model/flow";
import {FlowForm} from "../../../components/flow-form/FlowForm";
import {UserRegistrationExampleStatements} from "./user-registration-example";
import {UserEmailVerification} from "./user-email-verification";

export function FlowEdit() {
    const params = useParams()
    const navigate = useNavigate()
    const [flow, setFlow] = useState<Flow>()

    const repository = useRepository<Flow>(FlowEntityInfo)

    useEffect(() => {
        repository.get(params.id as string)
            .then(data => {
                setFlow({
                    ...data,
                    statements: UserEmailVerification,
                })
            })
    }, [params.id]);

    async function handleSave() {
        toast.promise(repository.update(flow as Flow), {
            loading: 'Saving...',
            success: 'Saved',
            error: err => err.message
        })
    }

    return <>
        <Box m={1}
             display='flex'
             flexDirection='column'
             flexGrow={1}
             height={'100%'}>
            <Stack direction='row'
                   spacing={1}>
                {flow && <TextField
                    label='Name'
                    value={flow.name}
                    onChange={e => setFlow({...flow, name: e.target.value})}/>}
                <Box flexGrow={1}/>
                <Button onClick={() => handleSave()} color='success'>Save</Button>
                <Button onClick={() => navigate('..')} color='info'>Cancel</Button>
            </Stack>
            <Box flexGrow={1}>
                {!flow && <LoadingOverlay/>}
                {flow && <FlowForm flow={flow} onChange={setFlow}/>}
            </Box>
        </Box>
    </>
}