import {Box, ButtonGroup, Card, CardHeader, Grid, IconButton, Switch} from "@mui/material";
import {getUserDisplayName, useCurrentUser} from "../../../context/current-user.tsx";
import {useConnection} from "../../context/ConnectionContext.tsx";
import Button from "@mui/material/Button";
import {FiberManualRecord, MoreVert} from "@mui/icons-material";
import {useClient} from "@apibrew/react";
import {useEffect, useState} from "react";
import {switchCase} from "../../../util/switch.ts";
import {MetricWidget} from "../../components/widgets/MetricWidget.tsx";
import {Duration, Metric} from "../../../cloud/model/metrics/instance-usage.ts";
import {useDrawer} from "../../../hooks/use-drawer.tsx";
import {MetricsDrawer} from "../../components/metrics-drawer/MetricsDrawer.tsx";
import {useCurrentInstance} from "../../../context/current-instance.tsx";

export default function HomePage() {
    const user = useCurrentUser()
    const connection = useConnection()
    const instance = useCurrentInstance()
    const client = useClient()
    const drawer = useDrawer()

    const [health, setHealth] = useState<{ status: string }>()

    useEffect(() => {
        fetch(
            `${client.getUrl()}/health`,
            {
                method: 'GET',
                headers: {
                    ...client.headers()
                },
            }
        ).then(response => response.json()).then(data => {
            setHealth(data as any)
        })
    }, []);

    const [metricsDuration, setMetricsDuration] = useState<Duration>(Duration.THIS_MONTH)
    const [cumulative, setCumulative] = useState<boolean>(false)

    return (
        <Box m={3} mt={0}>
            {drawer.render()}
            <div>
                <hr/>
            </div>
            <div className="user-info">
                <div>Welcome back, {getUserDisplayName(user)}</div>
                <div>Let's build your backend with ApiBrew!</div>
            </div>
            <div className="m1-div1">
                <div className="m1-div1-1">
                    <div/>
                    <div>
                        <a href='https://www.youtube.com/watch?v=6iJ5qCUbdgs&list=PLsuSSnTgTxwzqR7mqwkCvLwLLy_pFkBlv'>Youtube</a>
                        <br/>
                        <span>Training videos and more...</span>
                    </div>
                </div>
                <div className="m1-div1-1">
                    <div/>
                    <div>
                        <a href='https://apibrew.io/faq'>Faq</a>
                        <br/>
                        <span>Have a question?</span>
                    </div>
                </div>
                <div className="m1-div1-1">
                    <div/>
                    <div>
                        <a href='https://apibrew.io/community'>Community</a>
                        <br/>
                        <span>Need to discuss?</span>
                    </div>
                </div>
                <div className="m1-div1-1">
                    <div/>
                    <div>
                        <a href='https://docs.apibrew.io/'>Documentation</a>
                        <br/>
                        <span>See our docs</span>
                    </div>
                </div>
            </div>
            <hr/>
            <div className="m1-div2">
                <div className="m1-div2-1">
                    <span className="m1-div2-sp1">{instance?.title || connection.title}</span>
                    <Button variant='contained'
                            size='large'
                            color='secondary'>
                        <FiberManualRecord color={switchCase({
                            'disabled': health === undefined,
                            'success': Boolean(health && health?.status === 'ok'),
                            'error': Boolean(health && health?.status !== 'ok'),
                        })} style={{
                            fontSize: 13,
                            marginRight: 5
                        }}/>
                        Project Status
                    </Button>
                    <Button variant='contained'
                            size='large'
                            color='primary'>
                        Connect
                    </Button>
                </div>
                <div className="m1-div2-2">
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
                </div>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <Card>
                            <CardHeader title={<Box display='flex'>
                                <span>Requests</span>
                                <Box flexGrow={1}/>
                                <IconButton onClick={() => {
                                    drawer.open(<MetricsDrawer
                                        metric={Metric.REQUEST}
                                        title='Request Metrics'
                                        onClose={drawer.close}/>)
                                }}>
                                    <MoreVert/>
                                </IconButton>
                            </Box>}/>
                            <MetricWidget
                                metric={Metric.REQUEST}
                                duration={metricsDuration}
                                cumulative={cumulative}
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card>
                            <CardHeader title={<Box display='flex'>
                                <span>Nano Executions</span>
                                <Box flexGrow={1}/>
                                <IconButton onClick={() => {
                                    drawer.open(<MetricsDrawer
                                        metric={Metric.NANO_EXECUTION}
                                        title='Nano Metrics'
                                        onClose={drawer.close}/>)
                                }}>
                                    <MoreVert/>
                                </IconButton>
                            </Box>}/>
                            <MetricWidget
                                metric={Metric.NANO_EXECUTION}
                                duration={metricsDuration}
                                cumulative={cumulative}
                            />
                        </Card>
                    </Grid>
                    <Grid item xs={4}>
                        <Card>
                            <CardHeader title={<Box display='flex'>
                                <span>Storage</span>
                                <Box flexGrow={1}/>
                                <IconButton onClick={() => {
                                    drawer.open(<MetricsDrawer
                                        metric={Metric.STORAGE}
                                        title='Storage Metrics'
                                        onClose={drawer.close}/>)
                                }}>
                                    <MoreVert/>
                                </IconButton>
                            </Box>}/>
                            <MetricWidget
                                metric={Metric.STORAGE}
                                duration={metricsDuration}
                                cumulative={cumulative}
                            />
                        </Card>
                    </Grid>
                </Grid>
            </div>
            <div className="m1-div3">
                <div className="m1-div3-1">Client libraries</div>
                <div className="div-flex-wrap">
                    <div className="m1-div3-2">
                        <div className="m1-div3-2-1">
                            <img src="/smvpic9.png" alt="png"/>
                            <div className="m1-div3-2-1-1">
                                <span>Java Script</span>
                                <br/>
                                <span>
                  Lorem Ipsum Dolor Sit AmetLorem Ipsum Dolor Sit AmetLorem
                  Ipsum Dolor Sit AmetLorem Ipsum Dolor Sit Amet
                </span>
                            </div>
                        </div>
                        <hr/>
                        <div className="m1-div3-2-2">
                            <span>Name 2</span>
                            <button>Name 1</button>
                        </div>
                    </div>
                    <div className="m1-div3-2">
                        <div className="m1-div3-2-1">
                            <img src="/smvpic9.png" alt="png"/>
                            <div className="m1-div3-2-1-1">
                                <span>Java Script</span>
                                <br/>
                                <span>
                  Lorem Ipsum Dolor Sit AmetLorem Ipsum Dolor Sit AmetLorem
                  Ipsum Dolor Sit AmetLorem Ipsum Dolor Sit Amet
                </span>
                            </div>
                        </div>
                        <hr/>
                        <div className="m1-div3-2-2">
                            <span>Name 2</span>
                            <button>Name 1</button>
                        </div>
                    </div>
                    <div className="m1-div3-2">
                        <div className="m1-div3-2-1">
                            <img src="/smvpic9.png" alt="png"/>
                            <div className="m1-div3-2-1-1">
                                <span>Java Script</span>
                                <br/>
                                <span>
                  Lorem Ipsum Dolor Sit AmetLorem Ipsum Dolor Sit AmetLorem
                  Ipsum Dolor Sit AmetLorem Ipsum Dolor Sit Amet
                </span>
                            </div>
                        </div>
                        <hr/>
                        <div className="m1-div3-2-2">
                            <span>Name 2</span>
                            <button>Name 1</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="m1-div4">
                <div className="m1-div4-1">Example Projects</div>
                <div className="div-flex-wrap">
                    <div className="m1-div4-2">
                        <img src="/smvpic9.png" alt="png"/>
                        <div className="m1-div4-2-1">
                            <div className="m1-div4-2-1-1">
                                <span>Expo Starter</span>
                                <button>
                                    <img src="/smvpic1.png" alt="png"/>
                                </button>
                            </div>
                            <span>
                Lorem Ipsum Dolor Sit AmetLorem Ipsum Dolor Sit AmetLorem Ipsum
                Dolor Sit AmetLorem Ipsum Dolor Sit Amet
              </span>
                        </div>
                    </div>
                    <div className="m1-div4-2">
                        <img src="/smvpic9.png" alt="png"/>
                        <div className="m1-div4-2-1">
                            <div className="m1-div4-2-1-1">
                                <span>Expo Starter</span>
                                <button>
                                    <img src="/smvpic1.png" alt="png"/>
                                </button>
                            </div>
                            <span>
                Lorem Ipsum Dolor Sit AmetLorem Ipsum Dolor Sit AmetLorem Ipsum
                Dolor Sit AmetLorem Ipsum Dolor Sit Amet
              </span>
                        </div>
                    </div>
                    <div className="m1-div4-2">
                        <img src="/smvpic9.png" alt="png"/>
                        <div className="m1-div4-2-1">
                            <div className="m1-div4-2-1-1">
                                <span>Expo Starter</span>
                                <button>
                                    <img src="/smvpic1.png" alt="png"/>
                                </button>
                            </div>
                            <span>
                Lorem Ipsum Dolor Sit AmetLorem Ipsum Dolor Sit AmetLorem Ipsum
                Dolor Sit AmetLorem Ipsum Dolor Sit Amet
              </span>
                        </div>
                    </div>
                </div>
            </div>
        </Box>
    );
}
