const systemNamespace: string[] = [
    'nano', 'storage', 'studioX', 'system', 'actions'
]

export function isUserNamespace(namespace: string) {
    return systemNamespace.indexOf(namespace) === -1
}
