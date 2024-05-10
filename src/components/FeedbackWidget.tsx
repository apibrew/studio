import {Card, CardActions, CardContent, Popover, TextField} from "@mui/material";
import {useState} from "react";
import Button from "@mui/material/Button";
import {useConnection} from "../context/ConnectionContext";
import toast from "react-hot-toast";

export interface FeedbackWidgetProps {
    open: boolean;
    onClose?: () => void;
}

export function FeedbackWidget(props: FeedbackWidgetProps) {
    const [message, setMessage] = useState<string>('')
    const connection = useConnection()

    function handleSubmit() {
        fetch('https://manager.apibrew.io:8443/feedback', {
            method: 'POST',
            body: JSON.stringify({
                connection: connection.name,
                message: message,
                location: window.location.href,
            })
        })
        setMessage('')
        props.onClose?.()
        toast.success('Thank you for your feedback!')
    }

    return <>
        <Popover
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            onClose={props.onClose}
            open={props.open}>
            <Card
                sx={{
                    width: '400px',
                }}>
                <CardContent>
                    <TextField
                        multiline
                        fullWidth
                        rows={10}
                        value={message}
                        onChange={e => {
                            setMessage(e.target.value)
                        }}/>
                </CardContent>
                <CardActions>
                    <Button color='secondary' onClick={() => {
                        props.onClose?.()
                    }}>Cancel</Button>
                    <Button color='success'
                        onClick={() => {
                           handleSubmit()
                        }}>Submit</Button>
                </CardActions>
            </Card>
        </Popover>
    </>
}
