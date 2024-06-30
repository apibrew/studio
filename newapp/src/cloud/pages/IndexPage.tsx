import {useClient} from "@apibrew/react";
import {LoadingOverlay} from "common";
import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export function IndexPage() {
    const isAuthenticated = useClient().isAuthenticated();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate('instances');
        } else {
            navigate('login');
        }
    }, []);

    return <LoadingOverlay/>
}
