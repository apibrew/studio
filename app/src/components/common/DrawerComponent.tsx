import {Box, CardActions, CardContent, CardHeader, Stack} from "@mui/material";
import {ReactNode} from "react";

export interface DrawerComponentProps {
    title: string
    width?: any
    content: ReactNode;
    actions: ReactNode;

}

export function DrawerComponent(props: DrawerComponentProps) {
    return <>
        <Box
            width={props.width ?? 'auto'}
            height='100%'
            minWidth='500px'
            display='flex'
            flexDirection='column'
            minHeight='500px'>
            <CardHeader title={props.title}/>
            <CardContent style={{flexGrow: 1}}>
                {props.content}
            </CardContent>
            <CardActions>
                <Stack direction='row' spacing={1}>
                    <Box flexGrow={1}/>
                    {props.actions}
                </Stack>
            </CardActions>
        </Box>
    </>
}
