import {
    ValueDrawerComponent,
    ValueDrawerComponentFormProps,
    ValueDrawerComponentProps
} from "../common/ValueDrawerComponent";
import {File, FileEntityInfo} from "../../model/file";

import {Box, IconButton, TextField} from "@mui/material";
import {FileUploadOutlined} from "@mui/icons-material";
import {useRepository} from "@apibrew/react";
import {randomHex} from "../../../util/random";
import toast from "react-hot-toast";
import {ChangeEvent, useState} from "react";

export function FileUploadForm(props: ValueDrawerComponentFormProps<File>) {
    const [file, setFile] = useState<File>(props.value)

    const repository = useRepository<File>(FileEntityInfo)

    async function handleUpload(e: ChangeEvent<HTMLInputElement>) {
        const fileInput = e.target.files?.item(0)
        console.log(fileInput)

        let file$ = file

        if (!file || !file.id) {
            let result = await repository.create({
                name: randomHex(8),
            } as File)
            file$ = result
            setFile(result)
        }

        let uploadUrl = file$.uploadUrl

        if (!uploadUrl) {
            file$ = await repository.get(file$.id)

            uploadUrl = file$.uploadUrl
        }

        await fetch(uploadUrl, {
            method: 'PUT',
            body: fileInput
        }).then(async () => {
            toast.success('File uploaded')
        }).catch(err => {
            console.error(err)
            toast.error(err.message)
        })

        props.onChange(file$)
    }

    return <Box width='500px'>
        <TextField
            fullWidth
            value={file?.name || ''}
            variant="standard"
            disabled
            type="text"
            InputProps={{
                endAdornment: (
                    <IconButton component="label">
                        <FileUploadOutlined/>
                        <input
                            style={{display: "none"}}
                            type="file"
                            hidden
                            onChange={handleUpload}
                            name="[licenseFile]"
                        />
                    </IconButton>
                ),
            }}
        />

        <br/>
        <br/>
        <br/>

        {file && <>
            <b>Download Link: </b> <a href={file?.downloadUrl} target="_blank">{file?.downloadUrl}</a>
            <br/>
            <br/>
            <b>Upload Link: </b> {file?.uploadUrl}
        </>}
    </Box>
}

export const FileUploadDrawer = (props: Omit<ValueDrawerComponentProps<File>, "component">) => {
    return <ValueDrawerComponent {...props} component={FileUploadForm}/>
}
