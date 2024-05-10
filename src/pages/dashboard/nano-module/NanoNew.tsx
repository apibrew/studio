import {Box, Card, CardActions, CardContent, CardHeader, MenuItem, Select, TextField} from "@mui/material";
import Button from "@mui/material/Button";
import {useState} from "react";
import toast from "react-hot-toast";
import {useRepository} from "@apibrew/react";
import {useNavigate} from "react-router-dom";
import {MonacoNanoForm} from "../../../components/nano-form/MonacoNanoForm";
import {Module, ModuleEntityInfo} from "@apibrew/client/nano/model/module";
import {Language} from "@apibrew/client/nano/model/code";

export function NanoNew() {
    const [code, setModule] = useState<Module>({
        name: '',
        language: Language.JAVASCRIPT,
        source: 'exports.test = () => {\n    console.log("Hello World")\n}',
    } as Module)
    const navigate = useNavigate()
    const repository = useRepository<Module>(ModuleEntityInfo)

    async function handleSave() {
        toast.promise(repository.create(code as Module), {
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
                    <span>New Module</span>
                    <Select sx={{
                        width: '300px',
                        marginRight: '1rem'
                    }} value={code.language}
                            onChange={e => {
                                setModule({
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
                            setModule({
                                ...code,
                                name: e.target.value
                            })
                        }}
                        label='Name'
                        variant='standard'
                    />
                </>}/>
                <CardContent>
                    <MonacoNanoForm code={code.source}
                                    language={code.language}
                                    onChange={updated => {
                                        setModule({
                                            ...code,
                                            source: updated
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
