import {useParams} from "react-router-dom";
import {Direction, useRepository} from "@apibrew/react";
import {TaskRun, TaskRunEntityInfo} from "../../model/task-scheduler/task-run.ts";
import {TaskRunLog, TaskRunLogEntityInfo} from "../../model/task-scheduler/task-run-log.ts";
import {TaskRunProgress, TaskRunProgressEntityInfo} from "../../model/task-scheduler/task-run-progress.ts";
import {useEffect, useState} from "react";
import {useDataProvider} from "app/src/components/data-provider/use-data-provider";
import {LoadingOverlay} from "common";
import {LineChart} from '@mui/x-charts/LineChart';
import {useInterval} from "../../hooks/use-interval.ts";
import {Box} from "@mui/material";

export function RunPage() {
    const wi = useInterval(5000)
    const params = useParams()

    const taskRunRepository = useRepository<TaskRun>(TaskRunEntityInfo)
    const [taskRun, setTaskRun] = useState<TaskRun>()

    const taskId = params.id as string

    const taskRunLogs = useDataProvider<TaskRunLog>(TaskRunLogEntityInfo, {
        filters: {
            taskRun: taskId
        },
        limit: 100,
        sorting: [
            {
                property: 'timestamp',
                direction: Direction.DESC
            }
        ]
    }, wi)

    const [loading, setLoading] = useState<boolean>(true)

    async function load() {
        setLoading(true)
        setTaskRun(await taskRunRepository.get(taskId, ['$.task', '$.task.kind']))
        setLoading(false)
    }

    useEffect(() => {
        load()
    }, [taskId, wi]);

    if (loading || !taskRun) {
        return <LoadingOverlay/>
    }

    return <>
        {taskRun.task.name} - {taskRun.id} - {taskRun.status}
        <Box display='flex'>
            <Box flex={1}>
                <h2>Logs</h2>
                <Box maxHeight={800} overflow={'scroll'}>
                    {taskRunLogs && taskRunLogs.records.map(log => <div key={log.id}>{log.timestamp as string} -
                        [{log.level}]
                        - {log.message}</div>)}
                </Box>

                {taskRun.error && <>
            <pre>
                {taskRun.error}
            </pre>
                </>}
            </Box>
            <Box flex={1}>
                <TaskProgressChart taskRun={taskRun}/>
            </Box>
        </Box>
    </>
}

export interface TaskProgressChartProps {
    taskRun: TaskRun
}

export function TaskProgressChart(props: TaskProgressChartProps) {
    const taskRunProgresses = useDataProvider<TaskRunProgress>(TaskRunProgressEntityInfo, {
        filters: {
            taskRun: props.taskRun.id
        },
        limit: 100,
        sorting: [
            {
                property: 'timestamp',
                direction: Direction.DESC
            }
        ]
    })

    if (taskRunProgresses.loading) {
        return <LoadingOverlay/>
    }

    const records = taskRunProgresses.records

    records.reverse()

    const lastProgress = records[records.length - 1]

    let percentage = lastProgress?.completed && lastProgress?.total ? (lastProgress.completed / lastProgress.total * 100) : 0

    if (props.taskRun.status === 'SUCCESS') {
        percentage = 100
    }

    const lastRecord = records.length > 0 ? records[records.length - 1] : undefined

    let remainingTime = 0
    let averageSpeed = 0
    let lastSpeed = 0
    let expectedFinishTime = 0

    if (lastRecord) {
        lastSpeed = lastRecord.itemCount && lastRecord.duration ? lastRecord.itemCount! / lastRecord.duration! : 0
        averageSpeed = lastRecord.completed && lastRecord.cumDuration ? lastRecord.completed! / lastRecord.cumDuration! : 0
        remainingTime = lastRecord.total && lastRecord.completed && averageSpeed && averageSpeed > 0 ? (lastRecord.total! - lastRecord.completed!) / averageSpeed : 0
        expectedFinishTime = remainingTime && new Date().getTime() + remainingTime
    }

    return <>
        <h2>Progress [{Math.round(percentage * 100) / 100}%]</h2>
        <h5>Last Speed: {Math.floor(lastSpeed * 100000) / 100} item/s</h5>
        <h5>Average Speed: {Math.floor(averageSpeed * 100000) / 100} item/s</h5>
        <h5>Remaining Time: {formatDuration(remainingTime)}</h5>
        <h5>Expected Finish Time: {expectedFinishTime ? new Date(expectedFinishTime).toLocaleString() : ''}</h5>

        <LineChart
            xAxis={[
                {
                    data: records.map(progress => progress.step),

                }
            ]}
            series={[
                {
                    data: records.map(progress => progress.itemCount as number),
                },
            ]}
            height={300}
        />
        <LineChart
            xAxis={[
                {
                    data: records.map(progress => progress.step),
                }
            ]}
            series={[
                {
                    data: records.map(progress => progress.completed as number),
                },
                {
                    data: records.map(progress => progress.total as number),
                },
            ]}
            height={300}
        />
    </>
}

function formatDuration(ms: number) {
    const seconds = Math.floor(ms / 1000);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = secs.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

// Example usage:
const duration = 3661; // 1 hour, 1 minute, 1 second
console.log(formatDuration(duration)); // Output: "01:01:01"
