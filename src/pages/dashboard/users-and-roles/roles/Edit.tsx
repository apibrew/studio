'use client';

import {useEffect, useState} from "react";
import {useRepository} from "@apibrew/react";
import toast from "react-hot-toast";
import {Role} from "@apibrew/client/model";
import {RoleEntityInfo} from "@apibrew/client/model/role";
import {useNavigate, useParams} from "react-router-dom";
import {Box, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import {RoleForm} from "../../../../components/user-and-roles/RoleForm";

export default function EditRole() {
    const navigate = useNavigate()
    const {id} = useParams()
    const repository = useRepository<Role>(RoleEntityInfo)
    const [record, setRecord] = useState<Role>({} as Role)

    async function load() {
        setRecord({} as Role)
        // NProgress.start()
        const resp = await repository?.get(id as string, ['$.permissions[]'])
        // NProgress.done()
        if (!resp) {
            throw new Error('Failed to load record');
        } else {
            setRecord(resp)
        }
    }

    async function save() {
        toast.promise(repository?.update(record), {
            loading: 'Saving...',
            success: 'Role saved successfully',
            error: err => err.message
        }).then((resp) => {
            navigate('../' + resp.id)
        })
    }

    useEffect(() => {
        if (repository) {
            load();
        }
    }, [id]);

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
                    load()
                }}
                color='secondary'>Reset</Button>
            <Button
                onClick={() => {
                    navigate('..')
                }}
                color='info'>Cancel</Button>
        </Stack>
        <RoleForm value={record} onChange={setRecord}/>
    </>
}
