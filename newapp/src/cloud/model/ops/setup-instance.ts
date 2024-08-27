import {Instance} from '../instance';

export interface SetupInstance {
    id: string
    version: number
    instance: Instance
}

export const SetupInstanceEntityInfo = {
    namespace: "ops",
    resource: "SetupInstance",
    restPath: "ops-setup-instance",
}

export const SetupInstanceResource = {
  "auditData": {
    "createdBy": "admin@admin.com",
    "updatedBy": "admin",
    "createdOn": "2024-04-20T19:06:17Z",
    "updatedOn": "2024-05-20T15:08:33Z"
  },
  "name": "SetupInstance",
  "namespace": {
    "name": "ops"
  },
  "virtual": true,
  "properties": {
    "id": {
      "type": "UUID",
      "primary": true,
      "required": true,
      "immutable": true,
      "exampleValue": "a39621a4-6d48-11ee-b962-0242ac120002",
      "description": "The unique identifier of the resource. It is randomly generated and immutable.",
      "annotations": {
        "SourceMatchKey": "f0ca7120d2f5",
        "SpecialProperty": "true"
      }
    },
    "instance": {
      "type": "REFERENCE",
      "required": true,
      "reference": "default/Instance",
      "annotations": {
        "SourceMatchKey": "4e375a7189a0"
      }
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
        "SourceMatchKey": "d4d3185a205c",
        "SpecialProperty": "true"
      }
    }
  },
  "annotations": {
    "ActionApi": "true"
  }
} as unknown

