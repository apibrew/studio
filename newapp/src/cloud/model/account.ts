import {AccountPlan} from './account-plan';

export interface Account {
    version: number
    id: string
    name?: string
    plan?: AccountPlan
    email: string
}

export const AccountEntityInfo = {
    namespace: "default",
    resource: "Account",
    restPath: "account",
}

export const AccountResource = {
  "auditData": {
    "createdBy": "admin",
    "updatedBy": "admin",
    "createdOn": "2024-01-06T21:56:16Z",
    "updatedOn": "2024-08-28T20:02:25Z"
  },
  "name": "Account",
  "namespace": {
    "name": "default"
  },
  "properties": {
    "email": {
      "type": "STRING",
      "required": true,
      "unique": true,
      "description": "The email of the account",
      "annotations": {
        "SourceMatchKey": "45983fb5b8f9"
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
        "SourceMatchKey": "4e32a25c478c",
        "SpecialProperty": "true"
      }
    },
    "name": {
      "type": "STRING",
      "description": "The name of the account",
      "annotations": {
        "SourceMatchKey": "449b8a2e7d43"
      }
    },
    "plan": {
      "type": "REFERENCE",
      "reference": "default/AccountPlan",
      "annotations": {
        "SourceMatchKey": "64acf811eed7"
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
        "SourceMatchKey": "30fd8014c45e",
        "SpecialProperty": "true"
      }
    }
  }
} as unknown

