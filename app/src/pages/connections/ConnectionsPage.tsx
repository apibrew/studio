import {Box, IconButton, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography} from "@mui/material";
import Container from "@mui/material/Container";
import {Connection, connectionProvider} from "../../connection-provider";

import {LoadingOverlay} from "../../components/LoadingOverlay";
import {Add} from "@mui/icons-material";
import Button from "@mui/material/Button";
import {useDrawer} from "../../hooks/use-drawer";
import {ConnectionDrawer} from "../../components/connections/ConnectionDrawer";
import {Authentication, Server} from "@apibrew/client/config";
import {useEffect, useState} from "react";

function loadConnections(setConnections: (value: Connection[]) => void) {
    const connections$ = connectionProvider.listConnections

    if (!connections$) {
        return
    }
    connections$().then(connections => {
        setConnections(connections)
    })
}

export function ConnectionsPage() {
    const [connections, setConnections] = useState<Connection[]>()
    const drawer = useDrawer()

    useEffect(() => {
        loadConnections(setConnections);
    }, [])

    if (connectionProvider.connectionsPageLink) {
        window.location.href = connectionProvider.connectionsPageLink

        return <LoadingOverlay/>
    }

    return (
        <Container sx={{
            marginTop: '30px'
        }}>
            {drawer.render()}
            <Typography variant='h4'>
                Connections
            </Typography>
            <Box>
                <Typography variant='body1'>
                    Manage connections to your instances of ApiBrew Studio.
                </Typography>
            </Box>

            <Box display='flex' flexDirection='row' m={1}>
                <Button size='small' color='success' onClick={() => {
                    drawer.open(<ConnectionDrawer
                        new={true}
                        onClose={() => {
                            drawer.close()
                            loadConnections(setConnections)
                        }}
                        onRemove={(connection) => {
                            connectionProvider.deleteConnection!(connection.name).then(() => {
                                loadConnections(setConnections)
                            })
                        }}
                        connection={{
                            name: '',
                            serverConfig: {
                                host: '',
                                port: 0,
                                httpPort: 0,
                                authentication: {} as Authentication
                            } as Server
                        }}/>)
                }}>
                    <Add/> New Connection
                </Button>
            </Box>

            {!connections && <LoadingOverlay/>}

            {connections && <Box m={1}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <Typography>
                                    Name
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>
                                    Host
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>
                                    Port
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>
                                    Actions
                                </Typography>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {connections.map(connection => <TableRow key={connection.name}>
                            <TableCell>
                                <Typography>
                                    {connection.name}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>
                                    {connection.serverConfig.host}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Typography>
                                    {connection.serverConfig.port}
                                </Typography>
                            </TableCell>
                            <TableCell>
                                <Stack direction='row' spacing={1}>
                                    <IconButton
                                        color='primary'
                                        size='small'
                                        onClick={() => {
                                            drawer.open(<ConnectionDrawer
                                                new={false}
                                                onClose={() => {
                                                    drawer.close()
                                                    loadConnections(setConnections)
                                                }}
                                                onRemove={(connection) => {
                                                    connectionProvider.deleteConnection!(connection.name).then(() => {
                                                        loadConnections(setConnections)
                                                    })
                                                }}
                                                connection={connection}/>)
                                        }}>
                                        <Typography>
                                            Edit
                                        </Typography>
                                    </IconButton>
                                    <IconButton
                                        color='primary'
                                        size='small'
                                        onClick={() => {
                                            window.location.href = `/${connection.name}/dashboard`
                                        }}>
                                        <Typography>
                                            Open
                                        </Typography>
                                    </IconButton>
                                </Stack>
                            </TableCell>
                        </TableRow>)}
                    </TableBody>
                </Table>
            </Box>}
        </Container>
    );
}
