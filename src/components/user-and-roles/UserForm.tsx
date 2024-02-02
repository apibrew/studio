import Grid from "@mui/material/Unstable_Grid2";
import {Box, FormControl, FormHelperText, FormLabel, Stack, TextField} from "@mui/material";
import {PermissionsInput} from "../security/PermissionsInput";
import React from "react";
import {User} from "@apibrew/client/model";
import {ReferenceValueSelector} from "../ReferenceValueSelector";
import {ReferenceMultiValueSelector} from "../ReferenceMultiValueSelector";

export interface UserFormProps {
    value: User
    onChange: (value: User) => void
}

export function UserForm(props: UserFormProps) {
    return (
        <Grid container>
            <Grid xs={12} md={4}>
                <Box m={1}>
                    <Stack direction='column' spacing={2}>
                        <FormControl>
                            <FormLabel>Username</FormLabel>
                            <TextField
                                size='small'
                                variant='outlined'
                                value={props.value.username ?? ''}
                                onChange={e => props.onChange({...props.value, username: e.target.value})}
                            />
                            <FormHelperText>
                                The username of the user
                            </FormHelperText>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Password</FormLabel>
                            <TextField
                                size='small'
                                type='password'
                                variant='outlined'
                                value={props.value.password ?? ''}
                                onChange={e => props.onChange({...props.value, password: e.target.value})}
                            />
                            <FormHelperText>
                                New password for the user
                            </FormHelperText>
                        </FormControl>
                        <FormControl>
                            <FormLabel>Roles</FormLabel>
                            <ReferenceMultiValueSelector
                                required={false}
                                reference={'system/Role'}
                                multiple={true}
                                value={props.value.roles || []}
                                onChange={roles => {
                                    props.onChange({...props.value, roles})
                                }}/>
                            <FormHelperText>
                                New password for the user
                            </FormHelperText>
                        </FormControl>
                    </Stack>
                </Box>
            </Grid>
            <Grid xs={12} md={8}>
                {props.value.permissions && <PermissionsInput
                    mode={'user'}
                    value={props.value.permissions}
                    onChange={permissions => {
                        props.onChange({...props.value, permissions})
                    }}/>}
            </Grid>
        </Grid>
    )
}