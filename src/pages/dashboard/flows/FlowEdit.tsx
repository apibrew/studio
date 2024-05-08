import React, {useEffect, useState} from "react";
import {Box} from "@mui/material";
import {useRepository} from "@apibrew/react";
import {useParams} from "react-router-dom";
import {Flow, FlowEntityInfo} from "../../../model/flow";
import {FlowDesigner} from "../../../components/flow-designer/FlowDesigner";
import {LoadingOverlay} from "../../../components/LoadingOverlay";
import toast from "react-hot-toast";

export function FlowEdit() {
    const params = useParams()
    const [flow, setFlow] = useState<Flow>()

    const repository = useRepository<Flow>(FlowEntityInfo)

    useEffect(() => {
        repository.get(params.id as string, ['$.controls[].control'])
            .then(data => {
                setFlow({
                    ...data,
                })
            })
    }, [params.id]);

    if (!flow) {
        return <LoadingOverlay/>
    }

    return <>
        <Box m={1}
             display='flex'
             flexDirection='column'
             flexGrow={1}
             height={'100%'}>
            <Box flexGrow={1}>
                <FlowDesigner
                    flow={flow}
                    onSave={flow => {
                        toast.promise(repository.update(flow), {
                            loading: 'Saving...',
                            success: 'Saved',
                            error: err => err.message
                        })
                    }}
                />
            </Box>
        </Box>
    </>
}
