import React, {useEffect, useState} from "react";
import {Code, CodeEntityInfo} from "@apibrew/client/nano/model/code";
import {Box, Card, CardActions, CardContent, CardHeader, MenuItem, Select, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {LoadingOverlay} from "../../../components/LoadingOverlay";
import {useRepository} from "@apibrew/react";
import {useNavigate, useParams} from "react-router-dom";
import toast from "react-hot-toast";
import {MonacoNanoForm} from "../../../components/nano-form/MonacoNanoForm";

export function NanoEdit() {
    const params = useParams()
    const navigate = useNavigate()
    const [code, setCode] = useState<Code>()

    const repository = useRepository<Code>(CodeEntityInfo)

    useEffect(() => {
        repository.get(params.id as string).then(setCode)
    }, [params.id]);

    async function handleSave() {
        toast.promise(repository.update(code as Code), {
            loading: 'Saving...',
            success: 'Saved',
            error: err => err.message
        })
    }

    return <>
        <Box m={1}>
            <Card>
                <CardHeader title={<>
                    <span>Edit Nano Code</span>
                    {code && <Select sx={{
                        width: '300px',
                        marginRight: '1rem'
                    }} value={code.language}
                            onChange={e => {
                                setCode({
                                    ...code,
                                    language: e.target.value as any
                                })
                            }}>
                        <MenuItem value='JAVASCRIPT'>JavaScript</MenuItem>
                        <MenuItem value='TYPESCRIPT'>Typescript</MenuItem>
                    </Select>}
                    {code && <TextField
                        value={code.name ?? ''}
                        style={{marginLeft: '1rem', width: '400px', marginTop: '-14px'}}
                        onChange={e => {
                            setCode({
                                ...code,
                                name: e.target.value
                            })
                        }}
                        label='Name'
                        variant='standard'
                    />}
                </>}/>
                <CardContent>
                    {!code && <LoadingOverlay/>}
                    {code && <MonacoNanoForm code={code.content}
                                             language={code.language}
                                             onChange={updated => {
                                                 setCode({
                                                     ...code,
                                                     content: updated
                                                 })
                                             }}/>}
                </CardContent>
                <CardActions>
                    <Button onClick={() => {
                        handleSave()
                    }} color='success'>Save</Button>
                    <Button onClick={() => navigate('..')} color='info'>Cancel</Button>
                </CardActions>
            </Card>
        </Box>
    </>
}
