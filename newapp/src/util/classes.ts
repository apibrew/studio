export function getClassName(classMap: { [className: string]: boolean }): string {
    return Object.keys(classMap).filter(className => classMap[className]).join(' ')
}
