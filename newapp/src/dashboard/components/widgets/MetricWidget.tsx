import {LineChart} from '@mui/x-charts/LineChart';
import {useHostClient} from "../../../hooks/use-host-client.tsx";
import {Duration, InstanceUsage, InstanceUsageEntityInfo, Metric} from "../../../cloud/model/metrics/instance-usage.ts";
import {useEffect, useState} from "react";
import {LoadingOverlay} from "common";
import {useConnection} from "../../context/ConnectionContext.tsx";

export interface MetricWidgetProps {
    duration: Duration
    metric: Metric
    cumulative: boolean
}

export function MetricWidget(props: MetricWidgetProps) {
    const hostClient = useHostClient()
    const instanceUsageRepository = hostClient.repository<InstanceUsage>(InstanceUsageEntityInfo)
    const [requestMetric, setRequestMetric] = useState<InstanceUsage>()

    const connection = useConnection()

    useEffect(() => {
        instanceUsageRepository.create({
            instance: {
                name: connection.name,
            },
            duration: props.duration,
            metric: props.metric,
            owner: connection.name,
        } as InstanceUsage).then(instanceUsage => {
            setRequestMetric(instanceUsage)
        })
    }, [props.duration, props.metric, connection.name]);

    if (!requestMetric) {
        return <LoadingOverlay/>
    }

    let data = requestMetric.result!
        .map(item => ({
            time: new Date(Date.parse(item.time)),
            value: item.value,
        }))
        .sort((a, b) => a.time.getTime() - b.time.getTime())

    if (props.cumulative) {
        let sum = 0
        data = data.map(item => {
            sum += item.value
            return {
                time: item.time,
                value: sum,
            }
        })
    }

    return <LineChart
        xAxis={[{
            scaleType: 'time',
            data: data.map(item => item.time)
        }]}
        series={[
            {
                curve: 'monotoneY',
                showMark: false,
                data: data.map(item => item.value),
            },
        ]}
        height={200}
    />
}
