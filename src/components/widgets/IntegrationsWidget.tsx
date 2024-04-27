import React from "react";
import {Box, Stack, Typography} from "@mui/material";
import {useConnection} from "../../context/ConnectionContext";
import {WidgetLayout} from "../../layout/WidgetLayout";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";
import {useClient} from "@apibrew/react";

export function IntegrationsWidget() {
    const connection = useConnection()
    const client = useClient()

    const url = new URL(client.getUrl())

    return <WidgetLayout title='Quick Integration'>
        <Box>
            <Stack spacing={5}>
                <Typography>
                    This project is now ready to be used with Api Brew Client (apbr).
                </Typography>
                <Typography>
                    <b>Note:</b> see docs to setup apbr on your local machine. <a target='_blank'
                                                                                  href='https://docs.apibrew.io/cli/#configure'>https://docs.apibrew.io/cli/#configure</a>
                </Typography>
                <Box display='flex'>
                    <code>
                        apbr configure --cloud --project {connection.name} --token &lt;token&gt;
                    </code>
                    <Box flexGrow={1}/>
                    <Button
                        size='small'
                        variant='text'
                        sx={{
                            display: 'inline-block'
                        }}
                        onClick={() => {
                            navigator.clipboard.writeText(`apbr configure --cloud --project ${connection.name} --token ${connection.serverConfig.authentication.token}`)
                            toast.success('Copied to clipboard')
                        }}>Copy to clipboard</Button>
                </Box>
                <Typography>Additional configuration options:</Typography>
                <ul>
                    <li>
                        <b>Configuration type:</b> - ApiBrew Cloud
                    </li>
                    <li>
                        <b>Project ID:</b> - {connection.name}
                    </li>
                    <li>
                        <b>Token:</b> - <Button
                        size='small'
                        variant='text'
                        onClick={() => {
                            navigator.clipboard.writeText(connection.serverConfig.authentication.token)
                            toast.success('Token copied to clipboard')
                        }}>Copy to clipboard</Button>
                    </li>
                    <li>
                        <b>host:</b> - {url.hostname}
                    </li>
                    <li>
                        <b>port (grpc):</b> - 9443
                        <br/>
                        Grpc is mainly used by apbr itself and golang sdk
                    </li>
                    <li>
                        <b>port (http(s)):</b> - {url.port}
                        <br/>
                        Https is mainly used by other sdks and for REST api
                    </li>
                    <li>
                        <b>insecure:</b> - {(url.port === '443' || url.port === '8443') ? 'false' : 'true'}
                    </li>
                    <li>
                        <b>swagger</b> - <a target='_blank'
                                            rel='noreferrer'
                                            href={`${url}docs/swagger`}>{`${url}docs/swagger`}</a>
                    </li>
                </ul>
            </Stack>
        </Box>
    </WidgetLayout>
}
