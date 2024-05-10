import {useState} from "react";
import {TextField} from "@mui/material";

const container = import('http://localhost:4173/assets/remoteEntry.js')

container.then((container) => {
    console.log(container)
})


export function TestPage() {
    const [remoteUrl, setRemoteUrl] = useState<string>('http://localhost:4173/assets/remoteEntry.js')
    const [remoteName, setRemoteName] = useState<string>('List')
    const [ModuleX, setModuleX] = useState<any>(null)

    const loadRemote = () => {
        const entry = import(/* @vite-ignore */remoteUrl)
        entry.then((container) => {
            container.get('./' + remoteName).then(setModuleX)
        })
    }

    return <div>
        <TextField label="Remote URL" value={remoteUrl} onChange={(e) => setRemoteUrl(e.target.value)}/>
        <TextField label="Remote Name" value={remoteName} onChange={(e) => setRemoteName(e.target.value)}/>
        <button onClick={loadRemote}>Load Remote</button>

        <div>
            {ModuleX && <ModuleX items={['a', 'b']}/>}
        </div>

    </div>
}
