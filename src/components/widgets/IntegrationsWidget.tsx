import React from "react";
import {Box, Stack, Typography} from "@mui/material";
import {useConnection} from "../../context/ConnectionContext";
import {WidgetLayout} from "../../layout/WidgetLayout";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";

export function IntegrationsWidget() {
    const connection = useConnection()

    return <WidgetLayout title='Quick Integration'>
        <Box>
            <Stack spacing={5}>
                <Typography>
                    To configure your Api Brew Client (apbr) to use this project, use the following
                    configuration:
                </Typography>
                <Typography>
                    <b>Note:</b> see docs to setup apbr on your local machine. <a target='_blank'
                                                                                  href='https://docs.apibrew.io/cli/#configure'>https://docs.apibrew.io/cli/#configure</a>
                </Typography>
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
                </ul>
                <Typography>Additional configuration options:</Typography>
                <ul>
                    <li>
                        <b>host:</b> - {connection.name}.apibrew.io
                    </li>
                    <li>
                        <b>port (grpc):</b> - 9443
                        <br/>
                        Grpc is mainly used by apbr itself and golang sdk
                    </li>
                    <li>
                        <b>port (http(s)):</b> - 8443
                        <br/>
                        Https is mainly used by other sdks and for REST api
                    </li>
                    <li>
                        <b>insecure:</b> - false
                    </li>
                    <li>
                        <b>swagger</b> - <a target='_blank'
                                            href={`https://${connection.name}.apibrew.io:8443/docs/swagger`}>https://{connection.name}.apibrew.io:8443/docs/swagger</a>
                    </li>
                </ul>
            </Stack>
        </Box>
    </WidgetLayout>
}