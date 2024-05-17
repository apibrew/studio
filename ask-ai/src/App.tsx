import {useRecordByName} from "@apibrew/react";
import {AskAi} from "../lib/AskAi.tsx";
import {LoadingOverlay} from "common";
import {Instance, InstanceEntityInfo} from "../lib/model/instance.ts";
import {Box} from "@mui/material";

function App() {
    const instance = useRecordByName<Instance>(InstanceEntityInfo, 'project-bfd497')

    if (!instance) {
        return <LoadingOverlay/>
    }

    return (
        <Box display='flex' height='98vh' width='100%'>
            <AskAi instance={instance}/>
        </Box>
    )
}

export default App
