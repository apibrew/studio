import {NanoPlayGroundComponent} from "../../../components/nano-playground/NanoPlayGround";
import {Box, MenuItem, Select, TextField} from "@mui/material";
import React, {useEffect} from "react";
import {PlayGround, PlayGroundEntityInfo, PlayGroundResource} from "../../../model/play-ground";
import {Namespace, Resource, useClient} from "@apibrew/react";
import {ScriptResource} from "../../../model/script";
import toast from "react-hot-toast";
import {LoadingOverlay} from "../../../components/LoadingOverlay";
import {NamespaceEntityInfo} from "@apibrew/client/model/namespace";
import {ensureResource} from "../../../logic/ensure-resource";

export function NanoPlayGround() {
    const [items, setItems] = React.useState<PlayGround[]>()
    const client = useClient()
    const [selected, setSelected] = React.useState<PlayGround>()

    useEffect(() => {
        // ensure resources are loaded

        const prom = Promise.all([
            client.applyRecord<Namespace>(NamespaceEntityInfo, {
                name: 'studio',
                description: 'Studio',
                id: 'studio',
            } as Namespace),
            ensureResource(client, PlayGroundResource as Resource),
            ensureResource(client, ScriptResource as Resource),
        ])

        toast.promise(prom.then(() => client.listRecords<PlayGround>(PlayGroundEntityInfo, {
            limit: 1000,
        })), {
            loading: 'Loading PlayGrounds...',
            success: 'Loaded PlayGrounds',
            error: 'Failed to load PlayGrounds'
        }).then(async (response) => {
            setItems(response.content)

            if (response.content.length > 0) {
                setSelected(response.content[0])
            } else {
                const newPlayGround = {
                    name: 'New PlayGround',
                    run: true,
                } as PlayGround

                await client.createRecord(PlayGroundEntityInfo, newPlayGround).then((response) => {
                    setSelected(response)
                    console.log('found2')
                })
            }
        })
    }, []);


    return <>
        <Box m={1}>
            <Box display='flex'>
                <Select
                    sx={{
                        width: '200px',
                        marginRight: '20px'
                    }}
                    size='small'
                    value={selected?.id ?? ''}
                    onChange={e => {
                        const id = e.target.value as string
                        const item = items?.find(item => item.id === id)
                        setSelected(item)
                    }}>
                    {items?.map(item => (
                        <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                    ))}
                </Select>
                <TextField
                    size='small'
                    disabled={!selected}
                    value={selected?.name ?? ''}
                    onChange={e => {
                        const name = e.target.value as string
                        setSelected({
                            ...selected!,
                            name: name,
                        })
                    }}
                    onBlur={() => {
                        toast.promise(client.updateRecord(PlayGroundEntityInfo, selected!), {
                            loading: 'Updating PlayGround...',
                            success: 'Updated PlayGround',
                            error: 'Failed to update PlayGround'
                        })
                    }}
                />
            </Box>
            <Box>
                {!selected && <LoadingOverlay/>}
                {selected && <NanoPlayGroundComponent playground={selected}/>}
            </Box>
        </Box>
    </>
}