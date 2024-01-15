import {useNavigate} from "react-router-dom";
import {useEffect} from "react";

export default function IndexPage() {
    const navigate = useNavigate()

    useEffect(() => {
        navigate('/dashboard')
    }, []);

    return <></>
}