export interface PermissionChecks {
    full: boolean
    read: boolean
    create: boolean
    update: boolean
    delete: boolean
    allowOwnedOnly?: boolean
}
