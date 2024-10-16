
export interface DestroyAccount {
    id: string
    email: string
    details?: any
    version: number
}

export const DestroyAccountEntityInfo = {
    namespace: "ops",
    resource: "DestroyAccount",
    restPath: "ops-destroy-account",
}

export const DestroyAccountResource = {
  "auditData": {
    "createdBy": "admin@admin.com",
    "updatedBy": "admin@admin.com",
    "createdOn": "2024-04-14T06:35:35Z",
    "updatedOn": "2024-04-14T06:37:42Z"
  },
  "name": "DestroyAccount",
  "namespace": {
    "name": "ops"
  },
  "properties": {
    "details": {
      "type": "OBJECT"
    },
    "email": {
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

