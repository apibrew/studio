'use client';

import React, {useEffect, useState} from "react";
import {useClient, useRepository} from "@apibrew/react";
import Grid from "@mui/material/Unstable_Grid2";
import toast from "react-hot-toast";
import {Role} from "@apibrew/client/model";
import {RoleEntityInfo} from "@apibrew/client/model/role";
import {useNavigate, useParams} from "react-router-dom";
import {Box, FormControl, FormHelperText, FormLabel, Stack, TextField} from "@mui/material";
import {PermissionsInput} from "../../../../components/security/PermissionsInput";
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
            error: 'Failed to save Role'
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
