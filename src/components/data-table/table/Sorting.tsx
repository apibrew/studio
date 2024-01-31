import {Box, IconButton, MenuItem, Select, TextField, Typography} from "@mui/material";
import {useMemo, useState} from "react";
import {Add, Remove} from "@mui/icons-material";
import Button from "@mui/material/Button";
import {Resource, SortingItem} from "@apibrew/react";

export interface SortingProps {
    resource: Resource
    sorts: SortingItem[] | undefined
    onApply: (sorting: SortingItem[] | undefined) => void
}

export function Sorting(props: SortingProps) {
    const [sorts, setSorts] = useState<SortingItem[]>(props.sorts || [])
    const [changed, setChanged] = useState<boolean>(false)

    const properties = useMemo(() => Object.keys(props.resource.properties), [props.resource])

    return <Box p={1} width='400px'>
        {sorts.length === 0 && <Typography fontSize={14}>
            No sorts applied to this view
            <br/>
            Add a column below to sort the view
        </Typography>}

        {sorts.map((sort, index) => {
            return <Box key={index} p={1} display='flex' alignItems='center'>
                <Box flex={4} marginRight={1}>
                    <Select
                        fullWidth
                        value={sort.property}
                        onChange={e => {
                            sort.property = e.target.value as string
                            setSorts([...sorts])
                            setChanged(true)
                        }}
                        size='small'>
                        <MenuItem/>
                        {properties.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
                    </Select>
                </Box>
                <Box flex={1}>
                    <Select size='small' value={sort.direction ?? 'ASC'} onChange={e => {
                        sort.direction = e.target.value as any
                        setSorts([...sorts])
                        setChanged(true)
                    }}>
                        <MenuItem value='ASC'>ASC</MenuItem>
                        <MenuItem value='DESC'>DESC</MenuItem>
                    </Select>
                </Box>
                <Box marginLeft={1}>
                    <IconButton size='small' onClick={() => {
                        sorts.splice(index, 1)
                        setSorts([...sorts])
                        setChanged(true)
                    }}>
                        <Remove/>
                    </IconButton>
                </Box>
            </Box>
        })}

        <hr/>
        <Box display='flex'>
            <Button size='small' onClick={() => {
                setSorts([...sorts, {
                    property: '',
                    direction: 'ASC'
                } as SortingItem])
                setChanged(true)
            }}>
                <Add/>
                <span style={{marginLeft: '3px'}}>Add Sort</span>
            </Button>
            <Box flexGrow={1}/>

            <Button disabled={!changed} onClick={() => {
                props.onApply(sorts)
                setChanged(false)
            }}>
                <span style={{marginLeft: '3px'}}>Apply sorts</span>
            </Button>
        </Box>
    </Box>
}
