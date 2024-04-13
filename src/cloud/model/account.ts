
export interface Account {
    name?: string
    email?: string
    version: number
    id: string
}

export const AccountEntityInfo = {
    namespace: "default",
    resource: "Account",
    restPath: "account",
}

export const AccountResource = {
  "auditData": {
    "createdBy": "admin",
    "updatedBy": "system",
    "createdOn": "2024-01-06T21:56:16Z",
    "updatedOn": "2024-04-12T19:16:01Z"
  },
  "name": "Account",
  "namespace": {
    "name": "default"
  },
  "properties": {
    "email": {
      "type": "STRING",
      "description": "The email of the account"
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
    "name": {
      "type": "STRING",
      "description": "The name of the account"
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

