import {Box, ButtonGroup, Card, CardContent, CardHeader, Switch} from "@mui/material";
import {MetricWidget} from "../widgets/MetricWidget.tsx";
import {Duration, Metric} from "../../../cloud/model/metrics/instance-usage.ts";
import Button from "@mui/material/Button";
import {useState} from "react";

interface MetricsDrawerProps {
    title: string
    metric: Metric
    onClose?: () => void
}

export function MetricsDrawer(props: MetricsDrawerProps) {
    const [metricsDuration, setMetricsDuration] = useState<Duration>(Duration.THIS_MONTH)
    const [cumulative, setCumulative] = useState<boolean>(false)

    return <Box width='800px'>
        <Card>
            <CardHeader title={props.title}/>
            <CardContent>
               <Box>
                   <ButtonGroup
                       color='secondary'
                       variant="contained"
                       aria-label="Metric Duration">
                       <Button color={metricsDuration == Duration.LAST_YEAR ? 'success' : 'secondary'}
                               onClick={() => {
                                   setMetricsDuration(Duration.LAST_YEAR)
                               }}>Last Year</Button>
                       <Button color={metricsDuration == Duration.LAST_6_MONTHS ? 'success' : 'secondary'}
                               onClick={() => {
                                   setMetricsDuration(Duration.LAST_6_MONTHS)
                               }}>Last 6 Month</Button>
                       <Button color={metricsDuration == Duration.THIS_MONTH ? 'success' : 'secondary'}
                               onClick={() => {
                                   setMetricsDuration(Duration.THIS_MONTH)
                               }}>This Month</Button>
                       <Button color={metricsDuration == Duration.THIS_WEEK ? 'success' : 'secondary'}
                               onClick={() => {
                                   setMetricsDuration(Duration.THIS_WEEK)
                               }}>This Week</Button>
                       <Button color={metricsDuration == Duration.TODAY ? 'success' : 'secondary'}
                               onClick={() => {
                                   setMetricsDuration(Duration.TODAY)
                               }}>Today</Button>
                   </ButtonGroup>

                   <span style={{
                       marginLeft: 30
                   }}>Cumulative:</span>
                   <Switch
                       checked={cumulative}
                       onChange={(_, value) => {
                           setCumulative(value)
                       }}/>
               </Box>

              <Box>
                  <MetricWidget
                      metric={props.metric}
                      duration={metricsDuration}
                      cumulative={cumulative}
                  />
              </Box>

               <Box>
                   <Button onClick={props.onClose}>Close</Button>
               </Box>
            </CardContent>
        </Card>
    </Box>
}
