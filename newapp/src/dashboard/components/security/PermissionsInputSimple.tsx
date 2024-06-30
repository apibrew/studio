import {Fragment, useEffect, useState} from "react";
import {ChevronRight, ExpandMore} from "@mui/icons-material";
import {Checkbox, Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import {PermissionChecks} from "./model";
import {Namespace, Permission, Resource} from "@apibrew/client/model";
import {BaseLogger} from "../../../logging";
import {useClient, useRecords} from "@apibrew/react";
import {NamespaceEntityInfo} from "@apibrew/client/model/namespace";
import {Operation, Permit} from "@apibrew/client/model/permission";

const logger = BaseLogger.child({component: 'PermissionsInputSimple'})

export interface PermissionsInputSimpleProps {
    mode: 'user' | 'role' | 'resource' | 'namespace'
    constraints: Permission[]
    setConstraints: (constraints: Permission[]) => void
}

export function PermissionsInputSimple(props: PermissionsInputSimpleProps) {
    const namespaces = useRecords<Namespace>(NamespaceEntityInfo) || []
    const client = useClient()
    const [resources, setResources] = useState<Resource[]>([])

    logger.trace('render', {namespaces, resources, props})

    useEffect(() => {
        async function loadResources() {
            const resp = await client.listResources()
            if (!resp) {
                throw new Error('Failed to load resources')
            } else {
                setResources(resp)
                logger.debug('loaded resources', {resp})
            }
        }

        loadResources()
    }, [])

    const [open, setOpen] = useState<{
        [k: string]: boolean
    }>({
        'namespace-default': true
    })

    if (!namespaces || !resources || namespaces.length === 0 || resources.length === 0) {
        return <>Loading...</>
    }

    function updateConstraints(permissionSelector: Partial<Permission>, permissionChecks: PermissionChecks) {
        let updatedPermissions = [...props.constraints]
        if (permissionChecks.full) {
            updatedPermissions.push({
                ...permissionSelector,
                operation: Operation.FULL,
                permit: Permit.ALLOW
            } as Permission)

            props.setConstraints(updatedPermissions)
            return
        } else {
            updatedPermissions = updatedPermissions.filter(item => !resourceSelectorOverlaps(item, {
                ...permissionSelector,
                operation: Operation.FULL
            }))
        }

        if (permissionChecks.create) {
            updatedPermissions.push({
                ...permissionSelector,
                operation: Operation.CREATE,
                permit: Permit.ALLOW
            } as Permission)
        } else {
            updatedPermissions = updatedPermissions.filter(item => !resourceSelectorOverlaps(item, {
                ...permissionSelector,
                operation: Operation.CREATE
            }))
        }

        if (permissionChecks.update) {
            updatedPermissions.push({
                ...permissionSelector,
                operation: Operation.UPDATE,
                permit: Permit.ALLOW
            } as Permission)
        } else {
            updatedPermissions = updatedPermissions.filter(item => !resourceSelectorOverlaps(item, {
                ...permissionSelector,
                operation: Operation.UPDATE
            }))
        }

        if (permissionChecks.delete) {
            updatedPermissions.push({
                ...permissionSelector,
                operation: Operation.DELETE,
                permit: Permit.ALLOW
            } as Permission)
        } else {
            updatedPermissions = updatedPermissions.filter(item => !resourceSelectorOverlaps(item, {
                ...permissionSelector,
                operation: Operation.DELETE
            }))
        }

        if (permissionChecks.read) {
            updatedPermissions.push({
                ...permissionSelector,
                operation: Operation.READ,
                permit: Permit.ALLOW
            } as Permission)
        } else {
            updatedPermissions = updatedPermissions.filter(item => !resourceSelectorOverlaps(item, {
                ...permissionSelector,
                operation: Operation.READ
            }))
        }

        props.setConstraints(updatedPermissions)
    }

    return <>
        <Table size={'small'}>
            <TableHead>
                <TableRow>
                    <TableCell width={'300px'}><b>Name</b></TableCell>
                    <TableCell><b>Full</b></TableCell>
                    <TableCell><b>Read</b></TableCell>
                    <TableCell><b>Create</b></TableCell>
                    <TableCell><b>Update</b></TableCell>
                    <TableCell><b>Delete</b></TableCell>
                    <TableCell><b>Options</b></TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>
                        <b>All</b>
                    </TableCell>
                    <PermissionCheckBoxGroup
                        value={toPermissionChecks(props.constraints.filter(item => !item.namespace && !item.resource))}
                        indeterminate={toPermissionChecks(props.constraints)}
                        onChange={value => {
                            updateConstraints({namespace: undefined, resource: undefined}, value)
                        }}/>
                    <TableCell/>
                </TableRow>
                {namespaces.map(namespace => <Fragment key={namespace.name}>
                    <TableRow>
                        <TableCell>
                            <span>Namespace: <b>{namespace.name}</b></span>
                            <IconButton onClick={() => setOpen({
                                ...open,
                                [`namespace-${namespace.name}`]: !open[`namespace-${namespace.name}`]
                            })}>
                                {open[`namespace-${namespace.name}`] ? <ExpandMore/> : <ChevronRight/>}
                            </IconButton>
                        </TableCell>
                        <PermissionCheckBoxGroup
                            value={toPermissionChecks(props.constraints.filter(item => item.namespace === namespace.name && !item.resource))}
                            indeterminate={toPermissionChecks(props.constraints.filter(item => item.namespace === namespace.name))}
                            onChange={value => {
                                updateConstraints({namespace: namespace.name, resource: undefined}, value)
                            }}/>
                        <TableCell/>
                    </TableRow>
                    {open[`namespace-${namespace.name}`] && resources.filter(item => item.namespace.name === namespace.name)
                        .map(resource => <Fragment key={resource.name}>
                            <TableRow>
                                <TableCell>
                                    <Box sx={{marginLeft: '30px'}}>
                                        <span>Resource: <b>{resource.name}</b></span>
                                    </Box>
                                </TableCell>
                                <PermissionCheckBoxGroup
                                    value={toPermissionChecks(props.constraints.filter(item => item.namespace === namespace.name && item.resource === resource.name))}
                                    allowOptions={true}
                                    onChange={value => {
                                        updateConstraints({namespace: namespace.name, resource: resource.name}, value)
                                    }}/>
                            </TableRow>
                        </Fragment>)}
                </Fragment>)}
            </TableBody>
        </Table>
    </>
}

export interface PermissionCheckBoxGroupProps {
    value: PermissionChecks
    indeterminate?: PermissionChecks
    onChange: (value: PermissionChecks) => void
    allowOptions?: boolean
}

export function PermissionCheckBoxGroup(props: PermissionCheckBoxGroupProps) {
    const controls = ['full', 'read', 'create', 'update', 'delete']

    return <>
        {controls.map(item => {
            return <TableCell key={item}>
                <Checkbox checked={props.value['full'] || props.value[item as keyof PermissionChecks]}
                          indeterminate={!(props.value['full'] || props.value[item as keyof PermissionChecks]) && props?.indeterminate && (props.indeterminate['full'] || props.indeterminate[item as keyof PermissionChecks])}
                          onChange={e => {
                              if (item !== 'full' && props.value['full']) {
                                  return
                              }
                              props.onChange({
                                  ...props.value,
                                  [item]: e.target.checked
                              })
                          }}/>
            </TableCell>
        })}
    </>
}

function toPermissionChecks(permissions: Permission[]): PermissionChecks {
    return {
        full: permissions.some(item => item.operation === Operation.FULL),
        read: permissions.some(item => item.operation === Operation.READ),
        create: permissions.some(item => item.operation === Operation.CREATE),
        update: permissions.some(item => item.operation === Operation.UPDATE),
        delete: permissions.some(item => item.operation === Operation.DELETE),
    }
}

function resourceSelectorOverlaps(a: Partial<Permission>, b: Partial<Permission>) {
    return a.namespace === b.namespace && a.resource === b.resource && a.operation === b.operation
}
