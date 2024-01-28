import React, {useEffect, useState} from "react";
import {Code, CodeEntityInfo} from "@apibrew/client/nano/model/code";
import {Box, Card, CardActions, CardContent, CardHeader} from "@mui/material";
import {NanoForm} from "../../../components/nano-form/NanoForm";
import Button from "@mui/material/Button";
import {LoadingOverlay} from "../../../components/LoadingOverlay";
import {useRepository} from "@apibrew/react";
import {useParams} from "react-router-dom";
import toast from "react-hot-toast";

export function NanoEdit() {
    const params = useParams()

    const [code, setCode] = useState<Code>()

    const repository = useRepository<Code>(CodeEntityInfo)

    useEffect(() => {
        repository.get(params.id as string).then(setCode)
    }, [params.id]);



    async function handleSave() {
        toast.promise(repository.update(code as Code), {
            loading: 'Saving...',
            success: 'Saved',
            error: 'Failed to save'
        })
    }
    return <>
        <Box m={1}>
            <Card>
                <CardHeader title={`Edit Nano Code: ` + (code?.name ?? '...')}/>
                <CardContent>
                    {!code && <LoadingOverlay/>}
                    {code && <NanoForm
                        code={code}
                        onChange={setCode}/>}
                </CardContent>
                <CardActions>
                    <Button onClick={() => {
                        handleSave()
                    }} color='success'>Save</Button>
                    <Button color='info'>Cancel</Button>
                </CardActions>
            </Card>
        </Box>
    </>
}