import {helloAnything} from "core";

export function TestPage() {
    const data = helloAnything("world");

    return <div>
        {data}
    </div>
}
