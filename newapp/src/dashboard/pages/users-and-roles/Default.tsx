import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {LoadingOverlay} from "common";

export function UsersAndRolesPageDefault() {
    const navigate = useNavigate()

    useEffect(() => {
        navigate('users')
    }, []);

    return <LoadingOverlay/>
}
