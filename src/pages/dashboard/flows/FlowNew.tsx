import {Box} from "@mui/material";
import React from "react";
import {Flow} from "../../../model/flow";
import {FlowDesigner} from "../../../components/flow-designer/FlowDesigner";

export function FlowNew() {
    return <>
        <Box m={1}
             display='flex'
             flexDirection='column'
             flexGrow={1}
             height={'100%'}>
            <Box flexGrow={1}>
                <FlowDesigner flow={{
                    name: '',
                } as Flow}/>
            </Box>
        </Box>
    </>
}