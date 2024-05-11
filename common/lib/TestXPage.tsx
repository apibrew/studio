import {container, PageComponentType} from "core";

export function TestXPage() {
    return <div>Hello TestXPage ASD mmm!</div>;
}

container.registerComponent<PageComponentType>({
    componentType: 'page',
    name: 'TestXPage',
    component: TestXPage,
}, 'TestXPage')

console.log(container)
