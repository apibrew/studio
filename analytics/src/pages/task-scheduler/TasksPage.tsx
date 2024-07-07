import {Box, Stack, TextField} from "@mui/material";
import {GridPage} from "app/src/components/grid-page/GridPage.tsx";
import {Task, TaskEntityInfo} from "../../model/task-scheduler/task.ts";
import {ValueDrawerComponentFormProps} from "app/src/components/common/ValueDrawerComponent.tsx";
import {ReferenceValueSelector} from "app/src/components/ReferenceValueSelector";

export function TasksPage() {
    return <Box>
        <GridPage
            entityInfo={TaskEntityInfo}
            defaultParams={{
                resolveReferences: ['$.kind']
            }}
            gridColumns={['kind', 'name']}
            recordForm={TasksPageRecordForm}/>
    </Box>
}

export function TasksPageRecordForm(props: ValueDrawerComponentFormProps<Task>) {
    return <Stack spacing={2}>
        <TextField label='Name' value={props.value.name}
                   required={true}
                   onChange={e => props.onChange({...props.value, name: e.target.value})}/>
        <ReferenceValueSelector
            label='Kind'
            reference={'task-scheduler/TaskKind'}
            required={true}
            readOnly={props.value.id !== void 0}
            value={props.value.kind}
            onChange={updated => {
                props.onChange({
                    ...props.value,
                    kind: updated
                })
            }}
        />

        {props.value.kind?.parameters?.map((parameter, index) => {
            return <TextField
                key={index}
                label={parameter}
                value={props.value.arguments?.[parameter] || ''}
                onChange={e => props.onChange({
                    ...props.value,
                    arguments: {
                        ...props.value.arguments,
                        [parameter]: e.target.value as unknown as object
                    }
                })}/>
        })}
    </Stack>
}
