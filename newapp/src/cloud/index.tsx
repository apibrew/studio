import {useEffect, useState} from "react";
import {useHostClient} from "../hooks/use-host-client.tsx";
import {User} from "@apibrew/client/model";
import toast from "react-hot-toast";
import {handleErrorMessage} from "../util/errors.ts";
import {UserEntityInfo} from "@apibrew/client/model/user";
import {Account, AccountEntityInfo} from "./model/account.ts";
import {useNavigate} from "react-router-dom";
import {backendMode} from "../config";
import {ClientProvider} from "@apibrew/react";
import {CurrentUserContext} from "../context/current-user.tsx";
import {CurrentAccountContext} from "../context/current-account.tsx";
import {CloudLayout} from "./layout/CloudLayout.tsx";


export default function () {
    const hostClient = useHostClient()
    const userRepository = hostClient.repository<User>(UserEntityInfo)
    const accountRepository = hostClient.repository<Account>(AccountEntityInfo)

    const isAuthenticated = hostClient.isAuthenticated();
    const navigate = useNavigate();

    useEffect(() => {
        if (backendMode == 'cloud') {
            if (!isAuthenticated) {
                navigate('/login');
            }
        }
    }, []);

    useEffect(() => {
        if (backendMode == 'cloud') {
            hostClient.refreshToken().then(() => {
                userRepository.load({
                    username: hostClient.getTokenBody()?.username
                }).then(user => {
                    setUser(user)
                }).catch(err => {
                    toast.error(handleErrorMessage(err))
                })
                accountRepository.load({
                    email: hostClient.getTokenBody()?.username
                }, ['$.plan']).then(account => {
                    setAccount(account)
                }).catch(err => {
                    toast.error(handleErrorMessage(err))
                })
            })
        }
    }, []);
    const [user, setUser] = useState<User>()
    const [account, setAccount] = useState<Account>()


    useEffect(() => {
        if (backendMode !== 'cloud') {
            if (backendMode === 'single') {
                navigate('/hosted/dashboard');
            }
        }
    }, []);

    if (backendMode !== 'cloud') {
        if (backendMode === 'single') {
            return <></>;
        }
    }

    return <>
        <ClientProvider value={hostClient}>
            <CurrentUserContext.Provider value={user}>
                <CurrentAccountContext.Provider value={account}>
                    <CloudLayout/>
                </CurrentAccountContext.Provider>
            </CurrentUserContext.Provider>
        </ClientProvider>
    </>
}
