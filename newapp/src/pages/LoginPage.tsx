'use client';

import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {useHostClient} from "../hooks/use-host-client.tsx";
import './sign-pages.scss'
import {Layout} from "./outer-layout.tsx";
import {googleAuthUrl} from "./sso-config.ts";
import {backendMode} from "../config";

export const LoginPage = () => {
    const client = useHostClient();
    const navigate = useNavigate()
    const mode = backendMode

    useEffect(() => {
        if (client.isAuthenticated()) {
            navigate('/cloud')
        }
    }, [client]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        const loadingId = toast.loading('Logging in...');
        try {
            await client.authenticateWithUsernameAndPassword(email, password);
            navigate('/cloud')
            toast.success('Welcome: ' + client.getTokenBody()?.username);
        } catch (e: any) {
            toast.error(e.message);
        } finally {
            toast.dismiss(loadingId);
        }
    };

    return (
        <Layout>
            <div className="row2_1-welcome_back">

                <div>
                    <a className="logo flex-center" href="https://apibrew.io">
                        <img src="/logo.png" alt="png"/>
                    </a>

                    <div className="r1-1-div1">
                        {mode == 'cloud' && <div style={{
                            marginTop: '100px'
                        }}>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                        </div>}

                        <div className="r1-1-div1-1">
                            Welcome back
                        </div>
                        {mode == 'cloud' && <div className="r1-1-div1-2">
                            Dont have an account?
                            <a className="r1-1-a1" href="/register">Register</a>
                        </div>}

                        <div className="r1-1-div1-3">
                            Email
                        </div>
                        <input className="r1-1-i1" type="email" id="fname" name="fname"
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               placeholder="example@gmail.com"/>
                        <div className="r1-1-div1-3">
                            Password
                        </div>
                        <input className="r1-1-i1" type="password" id="fname" name="fname"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               placeholder="*** *** ***"/>

                        <button className="r1-1-btn1" onClick={() => {
                            handleLogin()
                        }}>Sign in
                        </button>

                        {mode == 'cloud' && <>
                            <div className="r1-1-div1-4">
                                or
                            </div>

                            <a className="r1-1-btn2"
                               href={googleAuthUrl()}>
                                <img className="sidebar-icon" src="/img2.png" alt="png"/>
                                <span>Sign up with Google</span>
                            </a>

                            <a className="r1-1-btn3"
                               href='https://github.com/login/oauth/authorize?client_id=a89380772432d652a35b&scope=user:email'>
                                <img className="sidebar-icon" src="/img3.png" alt="png"/>
                                <span>Sign up with Github</span>
                            </a>
                        </>}

                    </div>

                </div>

                <div style={{
                    backgroundImage: 'url("img1x.png")',
                    backgroundSize: 'cover',
                }}></div>

            </div>
        </Layout>
    );
};
