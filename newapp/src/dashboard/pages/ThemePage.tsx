import {Box, Button, Stack} from "@mui/material";

export function ThemePage() {
    return (
        <>
            <h1>Buttons</h1>
            <Box width='200px'>
                <Stack direction='column' spacing={2}>
                    <Button color='primary'>Primary button</Button>
                    <Button color='secondary'>Secondary button</Button>
                    <Button color='error'>Error button</Button>
                    <Button color='info'>Info button</Button>
                    <Button color='success'>Success button</Button>
                    <Button color='warning'>Warning button</Button>
                </Stack>
            </Box>
        </>
    )
}
