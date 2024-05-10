import {helloAnything, TestXPage} from "core";

export function TestPage() {
    const data = helloAnything("world");

    return <div>
        {data}

        <TestXPage/>
    </div>
}
