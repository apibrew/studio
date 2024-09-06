import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {LoadingOverlay} from "common";
import {useHostClient} from "../hooks/use-host-client.tsx";


export default function () {
    const hostClient = useHostClient()
    const isAuthenticated = hostClient.isAuthenticated();
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
        } else {
            navigate('/cloud')
        }
    }, []);

    return <LoadingOverlay/>
}
