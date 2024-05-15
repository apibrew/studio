'use client';

import {useEffect, useState} from "react";
import {useRepository} from "@apibrew/react";
import toast from "react-hot-toast";
import {User} from "@apibrew/client/model";
import {UserEntityInfo} from "@apibrew/client/model/user";
import {useNavigate, useParams} from "react-router-dom";
import {Box, Stack} from "@mui/material";
import Button from "@mui/material/Button";
import {UserForm} from "../../../../components/user-and-roles/UserForm";

export default function EditUser() {
    const navigate = useNavigate()
    const {id} = useParams()
    const repository = useRepository<User>(UserEntityInfo)
    const [record, setRecord] = useState<User>({} as User)

    async function load() {
        setRecord({} as User)
        // NProgress.start()
        const resp = await repository?.get(id as string, ['$.permissions[],$.roles[]'])
        // NProgress.done()
        if (!resp) {
            throw new Error('Failed to load record');
        } else {
            setRecord(resp)
        }
    }

    async function save() {
        if (record.password === '') {
            delete (record.password)
        }
        toast.promise(repository?.update(record), {
            loading: 'Saving...',
            success: 'User saved successfully',
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
        <UserForm value={record} onChange={setRecord}/>
    </>
}
