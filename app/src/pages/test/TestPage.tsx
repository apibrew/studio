import {container, PageComponentType, PageComponentTypeName, ReactPage} from "core";

export function TestPage() {
    const Page = container.getComponentByType<PageComponentType>(PageComponentTypeName).component

    console.log(ReactPage)

    return <div>
        <Page/>
    </div>
}
