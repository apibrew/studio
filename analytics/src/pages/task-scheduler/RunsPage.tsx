import {Box, Button, Stack} from "@mui/material";
import {GridPage} from "app/src/components/grid-page/GridPage.tsx";
import {ValueDrawerComponentFormProps} from "app/src/components/common/ValueDrawerComponent.tsx";
import {TaskRun, TaskRunEntityInfo} from "../../model/task-scheduler/task-run.ts";
import {ReferenceValueSelector} from "app/src/components/ReferenceValueSelector.tsx";
import {useNavigate} from "react-router-dom";
import {useRepository} from "@apibrew/react";
import {useState} from "react";

export function RunsPage() {
    const navigate = useNavigate()
    const repository = useRepository<TaskRun>(TaskRunEntityInfo)
    const [wi, setWi] = useState<number>(0)

    return <Box>
        <GridPage
            wi={wi}
            entityInfo={TaskRunEntityInfo}
            defaultParams={{
                resolveReferences: ['$.task']
            }}
            gridColumns={['task', 'status', 'startTime', 'endTime']}
            disableDefaultActions={true}
            actions={item => <>
                <Button onClick={() => {
                    navigate(`/dashboard/task-scheduler/runs/${item.id}`)
                }}>View</Button>
                <Button color='error' onClick={() => {
                    repository.update({
                        id: item.id,
                        status: 'CANCELLING'
                    } as TaskRun).then(() => {
                        setWi(wi + 1)
                    })
                }}>Cancel</Button>
            </>}
            recordForm={RunsPageRecordForm}/>
    </Box>
}

export function RunsPageRecordForm(props: ValueDrawerComponentFormProps<TaskRun>) {
    return <Stack spacing={2}>
        <ReferenceValueSelector
            label='Kind'
            reference={'task-scheduler/Task'}
            required={true}
            readOnly={props.value.id !== void 0}
            value={props.value.task}
            onChange={updated => {
                props.onChange({
                    ...props.value,
                    task: updated
                })
            }}
        />
    </Stack>
}
