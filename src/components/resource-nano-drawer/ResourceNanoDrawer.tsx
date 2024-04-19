import {NanoForm} from "../nano-form/NanoForm";
import React, {useEffect} from "react";
import {Box, Button, Card, CardActions, CardContent, CardHeader, Stack} from "@mui/material";
import {Code, CodeEntityInfo, Language} from "@apibrew/client/nano/model/code";
import {Resource, useRepository, useResourceByName} from "@apibrew/react";
import toast from "react-hot-toast";
import {LoadingOverlay} from "../LoadingOverlay";
import {MonacoNanoForm} from "../nano-form/MonacoNanoForm";

export interface ResourceNanoDrawerProps {
    resource: string
    namespace: string
    onClose: () => void;
}

export function ResourceNanoDrawer(props: ResourceNanoDrawerProps) {
    const repository = useRepository<Code>(CodeEntityInfo)
    const resource = useResourceByName(props.resource, props.namespace)

    const codeName = 'ResourceNano/' + props.namespace + '/' + props.resource

    let type = props.resource

    if (props.namespace && props.namespace !== '' && props.namespace !== 'default') {
        type = props.namespace + '/' + props.resource
    }

    const [code, setCode] = React.useState<Code>({
        name: codeName,
        content: `${props.resource} = resource('${type}')

${props.resource}.beforeCreate(record => {

    return record
})
        `,
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
    }, [codeName]);

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

    return (
        <>
            <Box width='80vw'>
                <Card>
                    <CardHeader title='Edit Code'/>
                </Card>
                <CardContent>
                    {!resource && <LoadingOverlay/>}
                    {resource &&  <MonacoNanoForm code={code.content}
                                                  onChange={updated => {
                                                      setCode({
                                                          ...code,
                                                          content: updated
                                                      })
                                                  }}/>}
                </CardContent>
                <CardActions>
                   <Box marginLeft={5}>
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
                   </Box>
                </CardActions>
            </Box>
        </>
    )
}
