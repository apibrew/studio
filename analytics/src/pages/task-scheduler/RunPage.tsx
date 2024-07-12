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
import {Box, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";

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
        limit: 10000,
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

    const records = sampleArray(taskRunProgresses.records, 100, e => 0 - new Date(e.timestamp!).getTime())

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
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Last Speed</TableCell>
                    <TableCell>Average Speed</TableCell>
                    <TableCell>Passed Time</TableCell>
                    <TableCell>Remaining Time</TableCell>
                    <TableCell>Expected Finish Time</TableCell>
                    <TableCell>Last Step</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>{Math.floor(lastSpeed * 100000) / 100} item/s</TableCell>
                    <TableCell>{Math.floor(averageSpeed * 100000) / 100} item/s</TableCell>
                    <TableCell>{formatDuration(lastRecord?.cumDuration as number)}</TableCell>
                    <TableCell>{formatDuration(remainingTime)}</TableCell>
                    <TableCell>{expectedFinishTime ? new Date(expectedFinishTime).toLocaleString() : ''}</TableCell>
                    <TableCell>{lastRecord?.step}</TableCell>
                </TableRow>
            </TableBody>
        </Table>

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

function sampleArray<T>(array: T[], sampleSize: number, sortKeyFunc: (elem: T) => number): T[] {
    if (sampleSize < 2) {
        throw new Error("Sample size must be at least 2 to include first and last elements.");
    }
    if (array.length <= sampleSize) {
        return array.slice().sort((a, b) => sortKeyFunc(a) - sortKeyFunc(b)); // Return the whole sorted array if it's smaller than or equal to the sample size
    }

    const firstElement = array[0];
    const lastElement = array[array.length - 1];

    // Get the elements in between
    const middleElements = array.slice(1, -1);

    // Shuffle the middle elements
    for (let i = middleElements.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [middleElements[i], middleElements[j]] = [middleElements[j], middleElements[i]];
    }

    // Select random elements from the shuffled middle elements
    const selectedMiddleElements = middleElements.slice(0, sampleSize - 2);

    // Combine first, selected middle, and last elements
    const result = [firstElement, ...selectedMiddleElements, lastElement];

    // Sort the result array using the provided sortKeyFunc
    return result.sort((a, b) => sortKeyFunc(a) - sortKeyFunc(b));
}
