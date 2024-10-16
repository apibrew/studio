import {Instance} from './instance';

export interface InstanceUserCredentials {
    id: string
    version: number
    instance: Instance
    dbPassword: string
    adminPassword: string
    controllerPassword: string
}

export const InstanceUserCredentialsEntityInfo = {
    namespace: "default",
    resource: "InstanceUserCredentials",
    restPath: "instance-user-credentials",
}

export const InstanceUserCredentialsResource = {
  "auditData": {
    "createdBy": "admin",
    "updatedBy": "admin@admin.com",
    "createdOn": "2024-01-06T21:56:19Z",
    "updatedOn": "2024-04-12T20:11:41Z"
  },
  "name": "InstanceUserCredentials",
  "namespace": {
    "name": "default"
  },
  "properties": {
    "adminPassword": {
      "type": "STRING",
      "required": true
    },
    "controllerPassword": {
      "type": "STRING",
      "required": true
    },
    "dbPassword": {
      "type": "STRING",
      "required": true
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

