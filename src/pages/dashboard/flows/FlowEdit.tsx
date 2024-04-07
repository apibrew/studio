import React, {useEffect, useState} from "react";
import {Box, Stack, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {LoadingOverlay} from "../../../components/LoadingOverlay";
import {useRepository} from "@apibrew/react";
import {useNavigate, useParams} from "react-router-dom";
import toast from "react-hot-toast";
import {ApiSaveParams, EventParams, Flow, FlowEntityInfo, Kind} from "../../../model/flow";
import {FlowForm} from "../../../components/flow-form/FlowForm";

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
                    statements: [
                        {
                            kind: Kind.EVENT,
                            params: {
                                type: 'UserRegistration',
                                action: 'CREATE',
                                sync: true,
                                responds: true,
                                finalizes: true,
                                order: 'BEFORE',
                            } as EventParams
                        },
                        {
                            kind: Kind.API_CREATE,
                            params: {
                                type: 'system/User',
                                payload: {
                                    username: '$username',
                                    password: '$password',
                                    roles: [{
                                        name: 'CUSTOMER'
                                    }]
                                }
                            } as ApiSaveParams,
                            variable: 'user',
                        },
                        {
                            kind: Kind.API_CREATE,
                            params: {
                                type: 'Profile',
                                payload: {
                                    username: '$username',
                                    roles: [{
                                        name: 'CUSTOMER'
                                    }]
                                }
                            } as ApiSaveParams
                        },
                        {
                            kind: Kind.END,
                            params: {},
                        }
                    ],
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