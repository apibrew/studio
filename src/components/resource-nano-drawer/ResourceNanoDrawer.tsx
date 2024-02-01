import {NanoForm} from "../nano-form/NanoForm";
import React, {useEffect} from "react";
import {Box, Button, Card, CardActions, CardContent, CardHeader, Stack} from "@mui/material";
import {Code, CodeEntityInfo, Language} from "@apibrew/client/nano/model/code";
import {Resource, useRepository} from "@apibrew/react";
import toast from "react-hot-toast";

export interface ResourceNanoDrawerProps {
    resource: Resource;
    onClose: () => void;
}

export function ResourceNanoDrawer(props: ResourceNanoDrawerProps) {
    const repository = useRepository<Code>(CodeEntityInfo)

    const codeName = 'ResourceNano/' + props.resource.namespace.name + '/' + props.resource.name

    const [code, setCode] = React.useState<Code>({
        name: codeName,
        content: '',
        language: Language.JAVASCRIPT,
    } as Code)

    useEffect(() => {
        repository.load({
            name: codeName,
        } as Code)
            .then((code) => {
                setCode(code)
            }, err => {
                console.error(err)
            })
    }, [props.resource]);

    function handleSave() {
        if (code.content.trim() === '') {
            if (code.id) {
                repository.delete(code.id)
                    .then(() => {
                        setCode({
                            name: codeName,
                            content: '',
                        } as Code)
                        toast.success('Code Saved')
                    }, err => {
                        toast.error(err)
                    })
            } else {
                toast.success('Code is empty, nothing to save')
            }

            return
        }
        const $save = code.id ? repository.update.bind(repository) : repository.create.bind(repository)

        console.log($save)

        $save(code)
            .then((code) => {
                setCode(code)
                toast.success('Code Saved')
            }, err => {
                toast.error(err.message)
            })
    }

    console.log('code', code)

    return (
        <>
            <Box width='1400px'>
                <Card>
                    <CardHeader title='Edit Code'/>
                </Card>
                <CardContent>
                    <NanoForm resource={props.resource} inline={true} code={code} onChange={setCode}/>
                </CardContent>
                <CardActions>
                    <Stack direction='row' spacing={1}>
                        <Button variant='contained'
                                size='small'
                                color='success'
                                onClick={() => {
                                    handleSave()
                                }}>Save</Button>
                        <Button variant='outlined'
                                size='medium'
                                color='primary'
                                onClick={() => props.onClose()}>Close</Button>
                    </Stack>
                </CardActions>
            </Box>
        </>
    )
}