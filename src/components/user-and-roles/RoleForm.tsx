import Grid from "@mui/material/Unstable_Grid2";
import {Box, FormControl, FormHelperText, FormLabel, Stack, TextField} from "@mui/material";
import {PermissionsInput} from "../security/PermissionsInput";
import React from "react";
import {Role} from "@apibrew/client/model";

export interface RoleFormProps {
    value: Role
    onChange: (value: Role) => void
}

export function RoleForm(props: RoleFormProps) {
    return (
        <Grid container>
            <Grid xs={12} md={4}>
                <Box m={1}>
                    <Stack direction='column' spacing={2}>
                        <FormControl>
                            <FormLabel>Name</FormLabel>
                            <TextField
                                size='small'
                                variant='outlined'
                                value={props.value.name ?? ''}
                                onChange={e => props.onChange({...props.value, name: e.target.value})}
                            />
                            <FormHelperText>
                                The name of the role
                            </FormHelperText>
                        </FormControl>
                    </Stack>
                </Box>
            </Grid>
            <Grid xs={12} md={8}>
                {props.value.permissions && <PermissionsInput
                    mode={'role'}
                    value={props.value.permissions}
                    onChange={permissions => {
                        props.onChange({...props.value, permissions})
                    }}/>}
            </Grid>
        </Grid>
    )
}
