'use client';

import React, {useState} from "react";
import {useRepository} from "@apibrew/react";
import toast from "react-hot-toast";
import {Permission, User} from "@apibrew/client/model";
import {UserEntityInfo} from "@apibrew/client/model/user";
import {useNavigate} from "react-router-dom";
import {Box, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import {UserForm} from "../../../../components/user-and-roles/UserForm";

export default function NewUser() {
    const navigate = useNavigate()
    const repository = useRepository<User>(UserEntityInfo)
    const [record, setRecord] = useState<User>({
        permissions: [] as Permission[],
    } as User)

    function save() {
        if (record.password === '') {
            delete (record.password)
        }
        toast.promise(repository?.create(record), {
            loading: 'Saving...',
            success: 'User saved successfully',
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
        <UserForm value={record} onChange={setRecord}/>
    </>
}
