import {MultiDrawerProps, TabComponentProps} from "../multi-drawer/MultiDrawer.tsx";
import {Instance} from "../../../cloud/model/instance.ts";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";
import {useConnection} from "../../context/ConnectionContext.tsx";
import {useClient} from "@apibrew/react";
import {Box, Stack, Typography} from "@mui/material";

function General(_: TabComponentProps<Instance>) {
    const connection = useConnection()
    const client = useClient()
    const url = new URL(client.getUrl())

    return <>
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
                <b>http host:</b> - {url.hostname}
            </li>
            <li>
                <b>grpc host:</b> - {url.hostname.replace('.apibrew.io', '-grpc.apibrew.io')}
            </li>
            <li>
                <b>port (grpc):</b> - 443
                <br/>
                Grpc is mainly used by apbr itself and golang sdk
            </li>
            <li>
                <b>port (http(s)):</b> - 443
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
    </>
}

function Apbr(_: TabComponentProps<Instance>) {
    const connection = useConnection()

    return <Stack spacing={2}>
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
    </Stack>
}

export function projectConnectDrawer(instance: Instance): MultiDrawerProps<Instance> {
    return {
        title: 'Project Connect',
        tabs: [
            {
                name: 'General',
                component: General,
            },
            {
                name: 'Apbr',
                component: Apbr,
            },
        ],
        initialValue: instance,
        sx: {
            width: '800px'
        }
    }
}
