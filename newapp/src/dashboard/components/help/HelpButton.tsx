import Button from "@mui/material/Button";
import {Help} from "@mui/icons-material";
import {useState} from "react";

export function HelpButton() {
    const [helpAnchor, setHelpAnchor] = useState<HTMLElement>();

    return <>
        <Button size='medium'
                variant='outlined'
                color={'success'}
                onClick={(event) => {
                    setHelpAnchor(event.currentTarget);

                }}>
            <Help fontSize='small'/>
            <span style={{marginLeft: '3px'}}>Help</span>
        </Button>
    </>
}
