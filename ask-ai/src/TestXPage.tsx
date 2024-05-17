import {Thread, ThreadEntityInfo} from "../lib/model/thread.ts";
import {useRecords} from "@apibrew/react";

export function TestXPage() {
    const threads = useRecords<Thread>(ThreadEntityInfo)

    if (!threads) {
        return <div>Loading...</div>
    }

    return <div>
        {threads.map(item => item.name)}
    </div>
}
