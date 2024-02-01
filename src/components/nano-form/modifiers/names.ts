export const resourceVarName = (resourceName: string) => {
    return resourceName.charAt(0).toUpperCase() + resourceName.slice(1);
}

export const resourceItemVarName = (resourceName: string) => {
    return resourceName.charAt(0).toLowerCase() + resourceName.slice(1);
}