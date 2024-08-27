import {useNavigate} from "react-router-dom";
import {useEffect} from "react";
import {LoadingOverlay} from "common";


export default function () {
    const navigate = useNavigate()

    useEffect(() => {
        navigate('/cloud')
    }, []);

    return <LoadingOverlay/>
}
