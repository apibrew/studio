import {container, PageComponentType} from "../lib";

function log() {
    return function(target: unknown) {
        console.log(target)
    }
}

@log()
class aaa {

}

new aaa()

export function TestXPage() {
    return <div>Hello TestXPage ASD!</div>;
}

container.registerComponent<PageComponentType>({
    componentType: 'page',
    name: 'TestXPage',
    component: TestXPage,
}, 'TestXPage')
