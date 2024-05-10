'use client';

import {useState} from "react";
import {useRepository} from "@apibrew/react";
import toast from "react-hot-toast";
import {Permission, Role} from "@apibrew/client/model";
import {RoleEntityInfo} from "@apibrew/client/model/role";
import {useNavigate} from "react-router-dom";
import {Box, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import {RoleForm} from "../../../../components/user-and-roles/RoleForm";

export default function NewRole() {
    const navigate = useNavigate()
    const repository = useRepository<Role>(RoleEntityInfo)
    const [record, setRecord] = useState<Role>({
        permissions: [] as Permission[],
    } as Role)

    function save() {
        toast.promise(repository?.create(record), {
            loading: 'Saving...',
            success: 'Role saved successfully',
            error: err => err.message
        }).then((resp) => {
            navigate('../' + resp.id)
        })
    }

    return <>
        <Stack direction='row' spacing={1}>
            <Box flexGrow={1}/>
            <Button
                onClick={() => {
                    save()
                }}
                color='success'>Save</Button>
            <Button
                onClick={() => {
                    navigate('..')
                }}
                color='info'>Cancel</Button>
        </Stack>
        <RoleForm value={record} onChange={setRecord}/>
    </>
}
