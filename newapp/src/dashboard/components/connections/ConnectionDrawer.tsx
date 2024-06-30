import {useState} from "react";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Checkbox,
    FormControl,
    FormHelperText,
    FormLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import toast from "react-hot-toast";
import {useConfirmation} from "../modal/use-confirmation";
import {cloudConnectionProvider, Connection} from "@apibrew/react";

export interface ConnectionDrawerProps {
    new: boolean
    connection: Connection
    onClose: () => void
    onRemove: (connection: Connection) => void
}

export function ConnectionDrawer(props: ConnectionDrawerProps) {
    const confirmation = useConfirmation()
    const [authenticationType, setAuthenticationType] = useState<'token' | 'credentials'>('credentials')

    function handleDelete() {
        confirmation.open({
            kind: 'confirm',
            message: 'Are you sure you want to delete these connection?',
            buttonMessage: 'Delete',
            onConfirm: () => {
                props.onRemove(connection)
            }
        })
    }

    const [connection, setConnection] = useState<Connection>(props.connection)
    return (
        <>
            {confirmation.render()}
            <Box width='600px'>
                <Card>
                    <CardHeader
                        title={props.new ? 'New connection' : 'Update connection: ' + connection.name}/>
                </Card>
                <CardContent>
                    <Stack spacing={2}>
                        <FormControl fullWidth>
                            <TextField
                                size='small'
                                value={connection.name}
                                label='Name'
                                variant='outlined'
                                onChange={(event) => {
                                    setConnection({
                                        ...connection,
                                        name: event.target.value
                                    })
                                }}/>
                            <FormHelperText>
                                The name of the connection.
                            </FormHelperText>
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField
                                size='small'
                                value={connection.title}
                                label='Title'
                                variant='outlined'
                                onChange={(event) => {
                                    setConnection({
                                        ...connection,
                                        title: event.target.value
                                    })
                                }}/>
                            <FormHelperText>
                                The title of the connection.
                            </FormHelperText>
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField
                                size='small'
                                value={connection.serverConfig.host}
                                label='Host'
                                variant='outlined'
                                onChange={(event) => {
                                    setConnection({
                                        ...connection,
                                        serverConfig: {
                                            ...connection.serverConfig,
                                            host: event.target.value
                                        }
                                    })
                                }}/>
                            <FormHelperText>
                                The name of the connection.
                            </FormHelperText>
                        </FormControl>
                        <FormControl fullWidth>
                            <TextField
                                size='small'
                                value={connection.serverConfig.port}
                                label='Host'
                                variant='outlined'
                                onChange={(event) => {
                                    setConnection({
                                        ...connection,
                                        serverConfig: {
                                            ...connection.serverConfig,
                                            port: parseInt(event.target.value),
                                            httpPort: parseInt(event.target.value),
                                        }
                                    })
                                }}/>
                            <FormHelperText>
                                The name of the connection.
                            </FormHelperText>
                        </FormControl>
                        <FormControl fullWidth>
                            <FormLabel>Insecure</FormLabel>
                            <Checkbox
                                size='small'
                                checked={connection.serverConfig.insecure}
                                onChange={(event) => {
                                    setConnection({
                                        ...connection,
                                        serverConfig: {
                                            ...connection.serverConfig,
                                            insecure: event.target.checked,
                                        }
                                    })
                                }}/>
                            <FormHelperText>
                                The name of the connection.
                            </FormHelperText>
                        </FormControl>
                        <Typography>Authentication Config</Typography>
                        <Select
                            onChange={e => {
                                setAuthenticationType(e.target.value as 'token' | 'credentials')
                            }}
                            value={authenticationType}>
                            <MenuItem value='token'>Token</MenuItem>
                            <MenuItem value='credentials'>Credentials</MenuItem>
                        </Select>
                        {authenticationType === 'token' && <>
                            <FormControl fullWidth>
                                <TextField
                                    size='small'
                                    value={connection.serverConfig.authentication.token}
                                    label='Token'
                                    variant='outlined'
                                    onChange={(event) => {
                                        setConnection({
                                            ...connection,
                                            serverConfig: {
                                                ...connection.serverConfig,
                                                authentication: {
                                                    ...connection.serverConfig.authentication,
                                                    token: event.target.value,
                                                }
                                            }
                                        })
                                    }}/>
                                <FormHelperText>
                                    Authentication token
                                </FormHelperText>
                            </FormControl>
                        </>}
                        {authenticationType === 'credentials' && <>
                            <FormControl fullWidth>
                                <TextField
                                    size='small'
                                    value={connection.serverConfig.authentication.username}
                                    label='Username'
                                    variant='outlined'
                                    onChange={(event) => {
                                        setConnection({
                                            ...connection,
                                            serverConfig: {
                                                ...connection.serverConfig,
                                                authentication: {
                                                    ...connection.serverConfig.authentication,
                                                    username: event.target.value,
                                                }
                                            }
                                        })
                                    }}/>
                                <FormHelperText>
                                    Authentication username
                                </FormHelperText>
                            </FormControl>
                            <FormControl fullWidth>
                                <TextField
                                    size='small'
                                    value={connection.serverConfig.authentication.password}
                                    label='Password'
                                    variant='outlined'
                                    onChange={(event) => {
                                        setConnection({
                                            ...connection,
                                            serverConfig: {
                                                ...connection.serverConfig,
                                                authentication: {
                                                    ...connection.serverConfig.authentication,
                                                    password: event.target.value,
                                                }
                                            }
                                        })
                                    }}/>
                                <FormHelperText>
                                    Authentication username
                                </FormHelperText>
                            </FormControl>
                        </>}
                    </Stack>
                </CardContent>
                <CardActions>
                    <Stack direction='row' spacing={1}>
                        <Button variant='contained'
                                size='small'
                                color='success'
                                onClick={() => {
                                    if (props.new) {
                                        toast.promise(cloudConnectionProvider.createConnection!(connection), {
                                            loading: 'Creating Connection...',
                                            success: 'Connection created',
                                            error: err => err.message
                                        }).then(() => {
                                            props.onClose()
                                        })
                                    } else {
                                        toast.promise(cloudConnectionProvider.updateConnection!(connection), {
                                            loading: 'Updating Connection...',
                                            success: 'Connection updated',
                                            error: err => err.message
                                        }).then(() => {
                                            props.onClose()
                                        })
                                    }
                                }
                                }>Save</Button>
                        {!props.new && <Button variant='outlined'
                                               size='medium'
                                               color='error'
                                               onClick={() => handleDelete()}>Delete</Button>}
                        <Button variant='outlined'
                                size='medium'
                                color='primary'
                                onClick={() => props.onClose()}>Cancel</Button>
                    </Stack>
                </CardActions>
            </Box>
        </>
    )
}
