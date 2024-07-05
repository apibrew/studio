import {Box, Tab, Tabs} from "@mui/material";
import {useState} from "react";
import {RunsPage} from "./RunsPage.tsx";
import {TasksPage} from "./TasksPage.tsx";

export function TaskSchedulerPage() {
    const [tab, setTab] = useState('runs')

    return <Box>
        <Tabs value={tab} onChange={(_, value) => {
            setTab(value)
        }}>
            <Tab value='runs' label='Runs'/>
            <Tab value='tasks' label='Tasks'/>
        </Tabs>

        {tab === 'runs' && <RunsPage/>}
        {tab === 'tasks' && <TasksPage/>}
    </Box>
}
