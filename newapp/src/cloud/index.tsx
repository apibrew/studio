import {ClientProvider} from "@apibrew/react";
import {useEffect, useState} from "react";
import {useHostClient} from "../hooks/use-host-client.tsx";
import {CloudLayout} from "./layout/CloudLayout.tsx";
import {CurrentUserContext} from "../context/current-user.tsx";
import {User} from "@apibrew/client/model";
import toast from "react-hot-toast";
import {handleErrorMessage} from "../util/errors.ts";
import {UserEntityInfo} from "@apibrew/client/model/user";


export default function () {
    const hostClient = useHostClient()
    const userRepository = hostClient.repository<User>(UserEntityInfo)

    useEffect(() => {
        hostClient.refreshToken().then(() => {
            userRepository.load({
                username: hostClient.getTokenBody()?.username
            }).then(user => {
                setUser(user)
            }).catch(err => {
                toast.error(handleErrorMessage(err))
            })
        })
    }, []);
    const [user, setUser] = useState<User>()

    return <>
        <ClientProvider value={hostClient}>
            <CurrentUserContext.Provider value={user}>
                <CloudLayout/>
            </CurrentUserContext.Provider>
        </ClientProvider>
    </>
}
