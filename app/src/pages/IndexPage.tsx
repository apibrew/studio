import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {LoadingOverlay} from "../components/LoadingOverlay";

export default function IndexPage() {
    const navigate = useNavigate()

    useEffect(() => {
        navigate('/connections')
    }, []);

    return <LoadingOverlay/>
}
