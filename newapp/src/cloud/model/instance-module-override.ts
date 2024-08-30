import {Instance} from './instance';

export interface InstanceModuleOverride {
    id: string
    path: string
    enabled?: boolean
    version: number
    instance: Instance
    dependencyVersion: string
}

export const InstanceModuleOverrideEntityInfo = {
    namespace: "default",
    resource: "InstanceModuleOverride",
    restPath: "instance-module-override",
}

export const InstanceModuleOverrideResource = {
  "auditData": {
    "createdBy": "admin@admin.com",
    "updatedBy": "admin@admin.com",
    "createdOn": "2024-05-01T18:32:46Z",
    "updatedOn": "2024-05-01T18:35:33Z"
  },
  "name": "InstanceModuleOverride",
  "namespace": {
    "name": "default"
  },
  "properties": {
    "dependencyVersion": {
      "type": "STRING",
      "required": true
    },
    "enabled": {
      "type": "BOOL"
    },
    "id": {
      "type": "UUID",
      "primary": true,
      "required": true,
      "immutable": true,
      "exampleValue": "a39621a4-6d48-11ee-b962-0242ac120002",
      "description": "The unique identifier of the resource. It is randomly generated and immutable.",
      "annotations": {
        "SpecialProperty": "true"
      }
    },
    "instance": {
      "type": "REFERENCE",
      "required": true,
      "reference": "default/Instance"
    },
    "path": {
      "type": "STRING",
      "required": true
    },
    "version": {
      "type": "INT32",
      "required": true,
      "defaultValue": 1,
      "exampleValue": 1,
      "title": "Version",
      "description": "The version of the resource/record. It is incremented on every update.",
      "annotations": {
        "AllowEmptyPrimitive": "true",
        "SpecialProperty": "true"
      }
    }
  }
} as unknown

