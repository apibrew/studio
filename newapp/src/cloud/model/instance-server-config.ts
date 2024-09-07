import {Instance} from './instance';

export interface InstanceServerConfig {
    config?: string
    modules?: string
    version: number
    instance: Instance
    helmValues?: string
    builderConfig?: string
    id: string
}

export const InstanceServerConfigEntityInfo = {
    namespace: "default",
    resource: "InstanceServerConfig",
    restPath: "instance-server-config",
}

export const InstanceServerConfigResource = {
  "auditData": {
    "createdBy": "admin@admin.com",
    "updatedBy": "admin@admin.com",
    "createdOn": "2024-04-20T19:05:13Z",
    "updatedOn": "2024-05-02T09:07:46Z"
  },
  "name": "InstanceServerConfig",
  "namespace": {
    "name": "default"
  },
  "properties": {
    "builderConfig": {
      "type": "STRING"
    },
    "config": {
      "type": "STRING",
      "length": 10000
    },
    "helmValues": {
      "type": "STRING",
      "length": 10000
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
      "unique": true,
      "reference": "default/Instance"
    },
    "modules": {
      "type": "STRING",
      "length": 10000
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

