import {Box} from "@mui/material";
import React from "react";
import {Flow, FlowEntityInfo} from "../../../model/flow";
import {FlowDesigner} from "../../../components/flow-designer/FlowDesigner";
import toast from "react-hot-toast";
import {useRepository} from "@apibrew/react";
import {useNavigate} from "react-router-dom";

export function FlowNew() {
    const repository = useRepository<Flow>(FlowEntityInfo)
    const navigate = useNavigate()

    return <>
        <Box m={1}
             display='flex'
             flexDirection='column'
             flexGrow={1}
             height={'100%'}>
            <Box flexGrow={1}>
                <FlowDesigner
                    flow={{
                        id: '',
                        name: '',
                        controls: [],
                        version: 0,
                    } as Flow}
                    onSave={flow => {
                        toast.promise(repository.create(flow), {
                            loading: 'Saving...',
                            success: 'Saved',
                            error: err => err.message
                        }).then(resp => {
                            navigate('../' + resp.name)
                        })
                    }}
                />
            </Box>
        </Box>
    </>
}
