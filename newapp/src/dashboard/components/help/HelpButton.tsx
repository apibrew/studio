import Button from "@mui/material/Button";
import {Help} from "@mui/icons-material";
import {useState} from "react";
import {Box, Popover, Tooltip} from "@mui/material";

export function HelpButton() {
    const [helpAnchor, setHelpAnchor] = useState<HTMLElement>();

    return <>
        <Tooltip title='Show help materials for this page.'>
            <Button size='medium'
                    variant='outlined'
                    color={'success'}
                    onClick={(event) => {
                        setHelpAnchor(event.currentTarget);

                    }}>
                <Help fontSize='small'/>
                <span style={{marginLeft: '3px'}}>Help</span>
            </Button>
        </Tooltip>
        <Popover
            open={Boolean(helpAnchor)}
            anchorEl={helpAnchor}
            onClose={() => setHelpAnchor(undefined)}
            anchorPosition={{
                top: 200,
                left: 200
            }}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <Box m={2}
                 width='500px'
                 height='400px'>
                <a target='_blank'
                   href='https://www.google.com'>How to create first API?</a>
            </Box>
        </Popover>
    </>
}
