export function registerPageComponent() {
    return (target: any) => {
        console.log(arguments)
        target.componentType = 'page';
    }
}
