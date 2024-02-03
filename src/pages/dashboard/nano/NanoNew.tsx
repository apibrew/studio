import {Box, Card, CardActions, CardContent, CardHeader} from "@mui/material";
import {NanoForm} from "../../../components/nano-form/NanoForm";
import Button from "@mui/material/Button";
import React, {useState} from "react";
import {Code, CodeEntityInfo, Language} from "@apibrew/client/nano/model/code";
import toast from "react-hot-toast";
import {useRepository} from "@apibrew/react";
import {useNavigate} from "react-router-dom";

export function NanoNew() {
    const [code, setCode] = useState<Code>({
        name: '',
        language: Language.JAVASCRIPT,
        content: '',
    } as Code)
    const navigate = useNavigate()
    const repository = useRepository<Code>(CodeEntityInfo)

    async function handleSave() {
        toast.promise(repository.create(code as Code), {
            loading: 'Saving...',
            success: 'Saved',
            error: err => err.message
        }).then(resp => {
            navigate('../' + resp.name)
        })
    }

    return <>
        <Box m={1}>
            <Card>
                <CardHeader title='New Nano Code'/>
                <CardContent>
                    <NanoForm
                        code={code}
                        onChange={setCode}/>
                </CardContent>
                <CardActions>
                    <Button onClick={() => handleSave()} color='success'>Save</Button>
                    <Button onClick={() => navigate('..')} color='info'>Cancel</Button>
                </CardActions>
            </Card>
        </Box>
    </>
}