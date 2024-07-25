import {Box, IconButton, MenuItem, Typography} from "@mui/material";
import {useMemo, useState} from "react";
import {Add, Clear} from "@mui/icons-material";
import Button from "@mui/material/Button";
import {Resource, SortingItem} from "@apibrew/react";
import TextField from "@mui/material/TextField";

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
                    <TextField
                        className='sorting-property'
                        select
                        fullWidth
                        label="Property"
                        value={sort.property ?? ''}
                        onChange={e => {
                            sort.property = e.target.value as string
                            setSorts([...sorts])
                            setChanged(true)
                        }}>
                        <MenuItem/>
                        {properties.map(item => <MenuItem key={item} value={item}>{item}</MenuItem>)}
                    </TextField>
                </Box>
                <Box flex={1}>
                    <TextField
                        select
                        className='sorting-order'
                        fullWidth
                        label="Order"
                        size='small'
                        value={sort.direction ?? 'ASC'}
                        onChange={e => {
                            sort.direction = e.target.value as any
                            setSorts([...sorts])
                            setChanged(true)
                        }}>
                        <MenuItem value='ASC'>ASC</MenuItem>
                        <MenuItem value='DESC'>DESC</MenuItem>
                    </TextField>
                </Box>
                <Box marginLeft={1}>
                    <IconButton size='small' onClick={() => {
                        sorts.splice(index, 1)
                        setSorts([...sorts])
                        setChanged(true)
                    }}>
                        <Clear/>
                    </IconButton>
                </Box>
            </Box>
        })}

        <Box display='flex'>
            <Button size='small' onClick={() => {
                setSorts([...sorts, {
                    property: '',
                    direction: 'ASC'
                } as SortingItem])
                setChanged(true)
            }}>
                <Add/>
                <span style={{marginLeft: '3px'}}>Add</span>
            </Button>
            <Box flexGrow={1}/>

            <Button color='secondary'
                    variant='text'
                    disabled={!changed} onClick={() => {
                props.onApply(sorts)
                setChanged(false)
            }}>
                <span style={{marginLeft: '3px'}}>Reset</span>
            </Button>

            <Button color='primary' disabled={!changed} onClick={() => {
                props.onApply(sorts)
                setChanged(false)
            }}>
                <span style={{marginLeft: '3px'}}>Sort</span>
            </Button>
        </Box>
    </Box>
}
