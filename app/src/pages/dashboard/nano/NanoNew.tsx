import {Box, Card, CardActions, CardContent, CardHeader, MenuItem, Select, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useState} from "react";
import {Code, CodeEntityInfo, Language} from "@apibrew/client/nano/model/code";
import toast from "react-hot-toast";
import {useRepository} from "@apibrew/react";
import {useNavigate} from "react-router-dom";
import {MonacoNanoForm} from "../../../components/nano-form/MonacoNanoForm";

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
            navigate('../' + resp.id)
        })
    }

    return <>
        <Box m={1}>
            <Card>
                <CardHeader title={<>
                    <span>New Code</span>
                    <Select sx={{
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
                    </Select>
                    <TextField
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
                    />
                </>}/>
                <CardContent>
                    <MonacoNanoForm code={code.content}
                                    language={code.language}
                                    onChange={updated => {
                                        setCode({
                                            ...code,
                                            content: updated
                                        })
                                    }}/>
                </CardContent>
                <CardActions>
                    <Button onClick={() => handleSave()} color='success'>Save</Button>
                    <Button onClick={() => navigate('..')} color='info'>Cancel</Button>
                </CardActions>
            </Card>
        </Box>
    </>
}
