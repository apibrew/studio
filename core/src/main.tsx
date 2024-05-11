import React from 'react'
import ReactDOM from 'react-dom/client'
import './TestXPage'
import {container, PageComponentType, PageComponentTypeName} from "../lib";

export function App() {
    const TestPage = (container.getComponentByType<PageComponentType>(PageComponentTypeName).component)

    return <>
        <TestPage/>
    </>
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App/>
    </React.StrictMode>,
)
