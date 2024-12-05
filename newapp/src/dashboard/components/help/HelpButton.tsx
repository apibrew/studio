import Button from "@mui/material/Button";
import {HelpOutline} from "@mui/icons-material";
import {useState} from "react";
import {Box, Popover, Tooltip} from "@mui/material";
import {Category, helpItems} from "./items.ts";

export interface HelpButtonProps {
    category: Category
}

export function HelpButton(props: HelpButtonProps) {
    const [helpAnchor, setHelpAnchor] = useState<HTMLElement>();

    return <>
        <Tooltip title='Show help materials for this page.'>
            <Button
                variant='text'
                onClick={(event) => {
                    setHelpAnchor(event.currentTarget);

                }}>
                <HelpOutline/> <span>Help</span>
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
            <Box width='300px'
                 height='400px'>
                <ul>
                    {helpItems.filter(item => item.category === props.category)
                        .map(item => <li>
                            <a target='_blank'
                               href={item.link}>{item.title}</a>
                        </li>)}
                </ul>
            </Box>
        </Popover>
    </>
}
