import {Instance} from './instance';

export interface Domain {
    namespace: string
    id: string
    host: string
    version: number
    instance: Instance
}

export const DomainEntityInfo = {
    namespace: "default",
    resource: "Domain",
    restPath: "domain",
}

export const DomainResource = {
  "auditData": {
    "createdBy": "admin@admin.com",
    "updatedBy": "admin@admin.com",
    "createdOn": "2024-05-06T11:41:47Z",
    "updatedOn": "2024-05-06T11:47:47Z"
  },
  "name": "Domain",
  "namespace": {
    "name": "default"
  },
  "properties": {
    "host": {
      "type": "STRING",
      "required": true,
      "unique": true
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
    "namespace": {
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

