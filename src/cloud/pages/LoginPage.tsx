'use client';

import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import {useClient} from '@apibrew/react';
import {GitHub} from "@mui/icons-material";
import {Layout} from "../layout/modern-layout";
import {useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import toast from "react-hot-toast";

export const LoginPage = () => {
    const client = useClient();
    const navigate = useNavigate()

    useEffect(() => {
        if (client.isAuthenticated()) {
            navigate('../post-login')
        }
    }, [client]);

    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleLogin = async () => {
        const loadingId = toast.loading('Logging in...');
        try {
            await client.authenticateWithUsernameAndPassword(email, password);
            navigate('../post-login')
            toast.success('Welcome: ' + client.getTokenBody()?.username);
        } catch (e: any) {
            toast.error(e.message);
        } finally {
            toast.dismiss(loadingId);
        }
    };

    return (
        <Layout>
            <div>
                <Stack
                    sx={{mb: 4}}
                    spacing={1}
                >
                    <Typography variant="h5">Log in</Typography>
                    <Typography
                        color="text.secondary"
                        variant="body2"
                    >
                        Don&apos;t have an account? &nbsp;
                        <Link
                            href={'../register'}
                            underline="hover"
                            variant="subtitle2"
                        >
                            Register
                        </Link>
                    </Typography>
                </Stack>
                <Stack spacing={3}>
                    <TextField
                        autoFocus
                        fullWidth
                        helperText='You can use your email or username'
                        label="Email Address"
                        name="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        fullWidth
                        helperText='Your password'
                        label="Password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Stack>
                <Button
                    fullWidth
                    sx={{mt: 3}}
                    size="large"
                    variant="contained"
                    onClick={() => handleLogin()}
                >
                    Continue
                </Button>
                <Button
                    fullWidth
                    sx={{mt: 3}}
                    size="small"
                    type="button"
                    variant="outlined"
                    color='secondary'
                    href='https://github.com/login/oauth/authorize?client_id=a89380772432d652a35b&scope=user:email'
                >
                    <GitHub/>
                    <span style={{marginLeft: '10px'}}>Continue with GitHub</span>
                </Button>
                {/*<Box sx={{mt: 3}}>*/}
                {/*  <Link*/}
                {/*    href="#"*/}
                {/*    underline="hover"*/}
                {/*    variant="subtitle2"*/}
                {/*  >*/}
                {/*    Forgot password?*/}
                {/*  </Link>*/}
                {/*</Box>*/}
            </div>
        </Layout>
    );
};
