'use client';

import {Layout} from "./outer-layout.tsx";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {UserRegistration, UserRegistrationEntityInfo} from "../cloud/model/user-registration.ts";
import {useHostClient} from "../hooks/use-host-client.tsx";

export const RegisterPage = () => {
    const client = useHostClient();
    const navigate = useNavigate()
    const userRegistrationRepository = client.repository<UserRegistration>(UserRegistrationEntityInfo);

    useEffect(() => {
        if (client.isAuthenticated()) {
            navigate('/cloud')
        }
    }, [client]);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        const loadingId = toast.loading('Logging in...');
        try {
            await userRegistrationRepository.create({
                emailAddress: email,
                name: name,
                password: password,
            } as UserRegistration)

            await client.authenticateWithUsernameAndPassword(email, password);
            navigate('/cloud')
        } catch (err: any) {
            toast.error(err.message);
        } finally {
            toast.dismiss(loadingId);
        }
    };

    return (
        <Layout>
            <div className="row1_1-create_account">
                <div>
                    <a className="logo flex-center" href="https://apibrew.io">
                        <img src="/logo.png" alt="png"/>
                    </a>

                    <div className="r1-1-div1">
                        <div className="r1-1-div1-1">
                            Create an account
                        </div>

                        <div className="r1-1-div1-2">
                            Already have an account?
                            <a className="r1-1-a1" href="/login">Log in</a>
                        </div>

                        <div className="r1-1-div1-3">
                            Full Name
                        </div>
                        <input className="r1-1-i1"
                               type="text"
                               id="fname"
                               name="fname"
                               value={name}
                               onChange={(e) => setName(e.target.value)}
                               placeholder="Name"/>

                        <div className="r1-1-div1-3">
                            Email
                        </div>
                        <input className="r1-1-i1"
                               type="email"
                               id="fname"
                               name="fname"
                               value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               placeholder="example@gmail.com"/>

                        <div className="r1-1-div1-3">
                            Password
                        </div>
                        <input className="r1-1-i1"
                               type="password"
                               id="fname"
                               name="fname"
                               value={password}
                               onChange={(e) => setPassword(e.target.value)}
                               placeholder="*** *** ***"/>

                        <button className="r1-1-btn1" onClick={() => {
                            handleRegister()
                        }}>Get started
                        </button>

                        <div className="r1-1-div1-4">
                            or
                        </div>

                        <a className="r1-1-btn2"
                           href='https://github.com/login/oauth/authorize?client_id=a89380772432d652a35b&scope=user:email'>
                            <img className="sidebar-icon" src="/img2.png" alt="png"/>
                            <span>Sign up with Google</span>
                        </a>


                        <a className="r1-1-btn3"
                           href='https://github.com/login/oauth/authorize?client_id=a89380772432d652a35b&scope=user:email'>
                            <img className="sidebar-icon" src="/img3.png" alt="png"/>
                            <span>Sign up with Github</span>
                        </a>
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
