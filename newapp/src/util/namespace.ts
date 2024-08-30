const systemNamespace: string[] = [
    'nano', 'storage', 'studio', 'system', 'actions'
]

export function isUserNamespace(namespace: string) {
    return systemNamespace.indexOf(namespace) === -1
}
