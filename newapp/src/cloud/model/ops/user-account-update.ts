import {Account} from '../account';

export interface UserAccountUpdate {
    password?: string
    id: string
    name?: string
    owner: string
    account?: Account
    version: number
}

export const UserAccountUpdateEntityInfo = {
    namespace: "ops",
    resource: "UserAccountUpdate",
    restPath: "ops-user-account-update",
}

export const UserAccountUpdateResource = {
  "auditData": {
    "createdBy": "admin",
    "updatedBy": "admin",
    "createdOn": "2024-08-30T09:03:53Z",
    "updatedOn": "2024-08-30T09:15:11Z"
  },
  "name": "UserAccountUpdate",
  "namespace": {
    "name": "ops"
  },
  "properties": {
    "account": {
      "type": "REFERENCE",
      "reference": "default/Account",
      "annotations": {
        "SourceMatchKey": "346aa9e14055"
      }
    },
    "id": {
      "type": "UUID",
      "primary": true,
      "required": true,
      "immutable": true,
      "exampleValue": "a39621a4-6d48-11ee-b962-0242ac120002",
      "description": "The unique identifier of the resource. It is randomly generated and immutable.",
      "annotations": {
        "SourceMatchKey": "8973c36ee184",
        "SpecialProperty": "true"
      }
    },
    "name": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "ce2537b16033"
      }
    },
    "owner": {
      "type": "STRING",
      "required": true,
      "annotations": {
        "SourceMatchKey": "a8f9eedcd68a"
      }
    },
    "password": {
      "type": "STRING",
      "virtual": true,
      "annotations": {
        "SourceMatchKey": "a2d2ac68ff0b"
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
        "SourceMatchKey": "0b23f1f9d15d",
        "SpecialProperty": "true"
      }
    }
  }
} as unknown

