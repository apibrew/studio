import {useEffect, useState} from "react";

export function useInterval(duration: number) {
    const [wi, setWi] = useState(0)

    useEffect(() => {
        const ih = setInterval(() => {
            setWi(prevWi => prevWi + 1);
            console.log('interval', wi)
        }, duration)

        return () => {
            clearInterval(ih)
        }
    }, [duration]);

    return wi

}
