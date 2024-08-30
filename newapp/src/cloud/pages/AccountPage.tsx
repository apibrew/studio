import {useRepository, useTokenBody} from "@apibrew/react";
import {useEffect, useState} from "react";
import {Account, AccountEntityInfo, Theme} from "../model/account.ts";
import {User} from "@apibrew/client/model";
import {UserEntityInfo} from "@apibrew/client/model/user";
import toast from "react-hot-toast";
import {handleErrorMessage} from "../../util/errors.ts";
import {LoadingOverlay} from "common";
import {Box, Card, CardActions, CardContent, CardHeader, FormControl, FormLabel, Stack} from "@mui/material";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import {UserAccountUpdate, UserAccountUpdateEntityInfo} from "../model/user-account-update.ts";

export function AccountPage() {
    const tokenBody = useTokenBody()
    const accountRepository = useRepository<Account>(AccountEntityInfo)
    const userRepository = useRepository<User>(UserEntityInfo)
    const userAccountUpdateRepository = useRepository<UserAccountUpdate>(UserAccountUpdateEntityInfo)
    const [account, setAccount] = useState<Account>()
    const [user, setUser] = useState<User>()
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [password, setPassword] = useState('')

    function load() {
        setUser(undefined)
        setAccount(undefined)
        accountRepository.load({
            email: tokenBody?.username
        }, ['$.plan']).then(account => {
            setAccount(account)
        }).catch(err => {
            toast.error(handleErrorMessage(err))
        })
        userRepository.load({
            username: tokenBody?.username
        }, []).then(user => {
            setUser(user)

            const name = (user.details as any).name || ''
            const nameParts = name.split(' ')

            setFirstName(nameParts[0] || '')
            setLastName(nameParts[1] || '')
        }).catch(err => {
            toast.error(handleErrorMessage(err))
        })
    }

    useEffect(() => {
        load()
    }, []);

    if (!account || !user) {
        return <LoadingOverlay/>
    }

    return <>
        <Card>
            <CardHeader title='Account Info'/>
            <CardContent>
                <Stack spacing={2}>
                    <FormControl>
                        <FormLabel>Username</FormLabel>
                        <TextField value={user.username} disabled/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Username</FormLabel>
                        <TextField value={user.username} disabled/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Password</FormLabel>
                        <TextField value={password}
                                   onChange={e => {
                                       setPassword(e.target.value)
                                   }} type='password'/>
                    </FormControl>
                </Stack>
            </CardContent>
            <CardActions>
                <Box display='flex' width='100%'>
                    <Box flexGrow={1}/>
                    <Button
                        size='small'
                        color='success'
                        variant='contained'
                        onClick={() => {
                            toast.promise(userAccountUpdateRepository.create({
                                account: account,
                                owner: user.username,
                                password: password
                            } as UserAccountUpdate), {
                                loading: 'Saving...',
                                success: 'Saved successfully',
                                error: err => handleErrorMessage(err)
                            }).then(load)
                        }}
                    >
                        Update password
                    </Button>
                </Box>
            </CardActions>
        </Card>
        <Card sx={{
            marginTop: 5,
        }}>
            <CardHeader title='Profile Info'/>
            <CardContent>
                <Stack spacing={2}>
                    <FormControl>
                        <FormLabel>First Name</FormLabel>
                        <TextField value={firstName}
                                   onChange={e => {
                                       setFirstName(e.target.value)
                                   }}/>
                    </FormControl>
                    <FormControl>
                        <FormLabel>Last Name</FormLabel>
                        <TextField value={lastName}
                                   onChange={e => {
                                       setLastName(e.target.value)
                                   }}/>
                    </FormControl>
                </Stack>
            </CardContent>
            <CardActions>
                <Box display='flex' width='100%'>
                    <Box flexGrow={1}/>
                    <Button
                        size='small'
                        color='success'
                        variant='contained'
                        onClick={() => {
                            toast.promise(userAccountUpdateRepository.create({
                                account: account,
                                owner: user.username,
                                name: firstName + " " + lastName
                            } as UserAccountUpdate), {
                                loading: 'Saving...',
                                success: 'Saved successfully',
                                error: err => handleErrorMessage(err)
                            }).then(load)
                        }}
                    >
                        Update User details
                    </Button>
                </Box>
            </CardActions>
        </Card>
        <Card sx={{
            marginTop: 5,
        }}>
            <CardHeader title='Theme'/>
            <CardContent>
                <Stack spacing={2}>
                    <FormControl>
                        <FormLabel>Interface</FormLabel>
                        <Select value={account.theme}
                                onChange={(e) => {
                                    setAccount({
                                        ...account,
                                        theme: e.target.value as Theme
                                    })
                                }}
                        >
                            <MenuItem value='SYSTEM'>System</MenuItem>
                            <MenuItem value='LIGHT'>Light</MenuItem>
                            <MenuItem value='DARK'>Dark</MenuItem>
                        </Select>
                    </FormControl>
                </Stack>
            </CardContent>
            <CardActions>
                <Box display='flex' width='100%'>
                    <Box flexGrow={1}/>
                    <Button
                        size='small'
                        color='success'
                        variant='contained'
                        onClick={() => {
                            toast.promise(userAccountUpdateRepository.create({
                                account: account,
                                owner: user.username,
                            } as UserAccountUpdate), {
                                loading: 'Saving...',
                                success: 'Saved successfully',
                                error: err => handleErrorMessage(err)
                            }).then(() => {
                                window.location.reload()
                            })
                        }}
                    >
                        Update Theme
                    </Button>
                </Box>
            </CardActions>
        </Card>
    </>
}
