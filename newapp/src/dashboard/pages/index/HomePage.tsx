import {Box, Card, CardHeader, Grid, IconButton} from "@mui/material";
import {getUserDisplayName, useCurrentUser} from "../../../context/current-user.tsx";
import {useConnection} from "../../context/ConnectionContext.tsx";
import Button from "@mui/material/Button";
import {CalendarToday, FiberManualRecord, FilterList, MoreVert} from "@mui/icons-material";
import {useClient} from "@apibrew/react";
import {useEffect, useState} from "react";
import {switchCase} from "../../../util/switch.ts";
import {TrafficMetricWidget} from "../../components/widgets/TrafficMetricWidget.tsx";
import {CountsWidget} from "../../components/widgets/CountsWidged.tsx";

export default function HomePage() {
    const user = useCurrentUser()
    const connection = useConnection()
    const client = useClient()

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
        fetch(
            `${client.getUrl()}/_metrics`,
            {
                method: 'GET',
                headers: {
                    ...client.headers()
                },
            }
        ).then(response => response.json()).then(data => {
            console.log('metrics', data)
        })
    }, []);

    console.log(health)

    return (
        <Box m={3} mt={0}>
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
                    <span className="m1-div2-sp1">{connection.title}</span>
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
                    <Button>
                        <CalendarToday sx={{marginRight: '5px'}} fontSize='small'/>
                        <span>Select dates</span>
                    </Button>
                    <Button sx={{marginLeft: '10px'}}>
                        <FilterList sx={{marginRight: '5px'}} fontSize='small'/>
                        <span>Filters</span>
                    </Button>
                </div>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Card>
                            <CardHeader title={<Box display='flex'>
                                <span>Traffic</span>
                                <Box flexGrow={1}/>
                                <IconButton>
                                    <MoreVert/>
                                </IconButton>
                            </Box>}/>
                            <TrafficMetricWidget/>
                        </Card>
                    </Grid>
                    <Grid item xs={6}>
                        <Card>
                            <CardHeader title={<Box display='flex'>
                                <span>Counts</span>
                                <Box flexGrow={1}/>
                                <IconButton>
                                    <MoreVert/>
                                </IconButton>
                            </Box>}/>
                            <CountsWidget/>
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
