import {AccessMap, PermissionChecks} from "./model";

import {namespacePermissions} from "./helper";

import {Namespace, Permission, Resource} from "@apibrew/client/model";
import {BaseLogger} from "../../logging";
import {Operation} from "@apibrew/client/model/permission";

const logger = BaseLogger.child({component: 'AccessMapComputer'})

function mapConstraintTo(constraint: Permission, permissionChecks?: PermissionChecks): boolean {
  if (!permissionChecks) {
    logger.warn('permissionChecks is undefined')
    return false
  }

  if (constraint.operation === Operation.FULL) {
    permissionChecks.full = true
  } else if (constraint.operation === Operation.READ) {
    permissionChecks.read = true
  } else if (constraint.operation === Operation.UPDATE) {
    permissionChecks.update = true
  } else if (constraint.operation === Operation.CREATE) {
    permissionChecks.create = true
  } else if (constraint.operation === Operation.DELETE) {
    permissionChecks.delete = true
  } else {
    throw new Error(`Unknown operation ${constraint.operation}`)
  }

  // if (constraint.property == 'owner' && constraint.propertyMode == 'PROPERTY_MATCH_ANY' && constraint.propertyValue == '$username') {
  //     permissionChecks.allowOwnedOnly = true
  // }

  return true
}

export function prepareAccessMap(accessMap: AccessMap, namespaces: Namespace[], resources: Resource[], constraints: Permission[]) {
  let updatedAccessMap = {...accessMap}

  logger.debug('prepareAccessMap', {namespaces, resources, constraints})

  if (!namespaces.some(item => item.name === 'system')) {
    namespaces.push({
      name: 'system',
    } as Namespace)
  }

  updatedAccessMap = {
    ...updatedAccessMap,
    "system": {
      full: false,
      read: false,
      create: false,
      update: false,
      delete: false
    },
  }

  for (const namespace of namespaces) {
    updatedAccessMap = {
      ...updatedAccessMap,
      [`namespace-${namespace.name}`]: {
        full: false,
        read: false,
        create: false,
        update: false,
        delete: false
      },
    }
  }
  for (const resource of resources) {
    updatedAccessMap = {
      ...updatedAccessMap,
      [`resource-${resource.namespace.name}/${resource.name}`]: {
        full: false,
        read: false,
        create: false,
        update: false,
        delete: false
      },
    }
  }

  for (const constraint of constraints) {
    if (!constraint.resource) { // namespace or system level
      if (!constraint.namespace) { // system level
        if (mapConstraintTo(constraint, updatedAccessMap['system'])) {
          constraint.localFlags = {
            imported: true,
          }
        }
      } else { // namespace level
        if (mapConstraintTo(constraint, updatedAccessMap[`namespace-${constraint.namespace}`])) {
          constraint.localFlags = {
            imported: true,
          }
        }
      }
    } else { // resource level
      if (mapConstraintTo(constraint, updatedAccessMap[`resource-${constraint.namespace}/${constraint.resource}`])) {
        constraint.localFlags = {
          imported: true,
        }
      }
    }
  }

  return updatedAccessMap;
}

export function prepareConstraintsFromAccessMap(constraints: Permission[], accessMap: AccessMap, namespaces: Namespace[], resources: Resource[]): Permission[] {
  const updatedConstraints: Permission[] = []

  const systemPermission = accessMap.system

  const systemConstraint = {
    permit: 'ALLOW',
    localFlags: {
      imported: true,
    }
  } as Permission

  if (systemPermission.full) {
    updatedConstraints.push({
      ...systemConstraint,
      operation: Operation.FULL
    })
  }
  if (systemPermission.read) {
    updatedConstraints.push({
      ...systemConstraint,
      operation: Operation.READ,
    })
  }
  if (systemPermission.create) {
    updatedConstraints.push({
      ...systemConstraint,
      operation: Operation.CREATE,
    })
  }
  if (systemPermission.update) {
    updatedConstraints.push({
      ...systemConstraint,
      operation: Operation.UPDATE,
    })
  }
  if (systemPermission.delete) {
    updatedConstraints.push({
      ...systemConstraint,
      operation: Operation.DELETE,
    })
  }

  for (const namespace of namespaces) {
    const namespacePermission = namespacePermissions(accessMap, namespace.name)

    const namespaceConstraint = {
      namespace: namespace.name,
      permit: 'ALLOW',
      localFlags: {
        imported: true,
      }
    } as Permission

    if (namespacePermission.full) {
      updatedConstraints.push({
        ...namespaceConstraint,
        operation: Operation.FULL,
      })
    }
    if (namespacePermission.read) {
      updatedConstraints.push({
        ...namespaceConstraint,
        operation: Operation.READ,
      })
    }
    if (namespacePermission.create) {
      updatedConstraints.push({
        ...namespaceConstraint,
        operation: Operation.CREATE,
      })
    }
    if (namespacePermission.update) {
      updatedConstraints.push({
        ...namespaceConstraint,
        operation: Operation.UPDATE,
      })
    }
    if (namespacePermission.delete) {
      updatedConstraints.push({
        ...namespaceConstraint,
        operation: Operation.DELETE,
      })
    }
  }

  for (const resource of resources) {
    const resourcePermission = accessMap[`resource-${resource.namespace.name}/${resource.name}`]

    const resourceConstraint = {
      namespace: resource.namespace.name,
      resource: resource.name,
      permit: 'ALLOW',
      localFlags: {
        imported: true,
      }
    } as Permission

    if (resourcePermission.full) {
      updatedConstraints.push({
        ...resourceConstraint,
        operation: Operation.FULL,
      })
    }
    if (resourcePermission.read) {
      updatedConstraints.push({
        ...resourceConstraint,
        operation: Operation.READ,
      })
    }
    if (resourcePermission.create) {
      updatedConstraints.push({
        ...resourceConstraint,
        operation: Operation.CREATE,
      })
    }
    if (resourcePermission.update) {
      updatedConstraints.push({
        ...resourceConstraint,
        operation: Operation.UPDATE,
      })
    }
    if (resourcePermission.delete) {
      updatedConstraints.push({
        ...resourceConstraint,
        operation: Operation.DELETE,
      })
    }
  }

  // keep constraints which is not related to access map
  for (const constraint of constraints) {
    if ((constraint.localFlags as any)?.imported) {
      continue
    }

    updatedConstraints.push(constraint)
  }

  return updatedConstraints;
}
