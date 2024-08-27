export function switchCase<T>(classMap: { [className: string]: boolean }): T {
    return Object.keys(classMap).find(className => classMap[className]) as T
}
