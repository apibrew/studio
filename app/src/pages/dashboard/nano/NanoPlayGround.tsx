import {Box, MenuItem, Select, Stack} from "@mui/material";
import {useState} from "react";
import {useRepository} from "@apibrew/react";
import Button from "@mui/material/Button";
import {Script, ScriptEntityInfo} from "@apibrew/client/nano/model/script";
import {MonacoNanoForm} from "../../../components/nano-form/MonacoNanoForm";
import toast from "react-hot-toast";

export function NanoPlayGround() {
    const [script, setScript] = useState<Script>({
        source: 'const a = 1\nconst b = 2\na + b\n',
        language: 'JAVASCRIPT',
    } as Script)
    const repository = useRepository<Script>(ScriptEntityInfo)

    let out = ''

    if (typeof script.output === 'string') {
        out = script.output
    } else if (typeof script.output === 'object') {
        out = JSON.stringify(script.output, null, 2)
    } else if (typeof script.output === 'number') {
        out = script.output
    } else {
        out = script.output as any
    }

    async function handleRun() {
        const loadingId = toast.loading('Running...')

        try {
            const result = await repository.create(script)
            setScript({
                ...script,
                output: result.output
            })

            toast.success('Done')
        } catch (e: any) {
            toast(e.message)
            setScript({
                ...script,
                output: e.message
            })
        } finally {
            toast.dismiss(loadingId)
        }
    }

    return <>
        <Stack flexDirection='column' m={1} spacing={1}>
            <Box>
                <Select sx={{
                    width: '300px',
                    marginRight: '1rem'
                }} value={script.language}
                        onChange={e => {
                            setScript({
                                ...script,
                                language: e.target.value as any
                            })
                        }}>
                    <MenuItem value='JAVASCRIPT'>JavaScript</MenuItem>
                    <MenuItem value='TYPESCRIPT'>Typescript</MenuItem>
                </Select>
                <Button onClick={() => {
                    handleRun()
                }}>Run</Button>
            </Box>
            <Box>
                <MonacoNanoForm code={script.source}
                                language={script.language}
                                onChange={updated => {
                                    setScript({
                                        ...script,
                                        source: updated
                                    })
                                }}/>
            </Box>

            <Box display='flex' flexDirection='row'>
                <Box flexGrow={1}
                     p={1}>
                    {(out)}
                </Box>
            </Box>
        </Stack>
    </>
}
