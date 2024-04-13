
export interface ControllerAccessToken {
    id: string
    token?: string
    version: number
    instance: string
}

export const ControllerAccessTokenEntityInfo = {
    namespace: "ops",
    resource: "ControllerAccessToken",
    restPath: "ops-controller-access-token",
}

export const ControllerAccessTokenResource = {
  "auditData": {
    "createdBy": "admin@admin.com",
    "updatedBy": "admin@admin.com",
    "createdOn": "2024-04-12T11:53:00Z",
    "updatedOn": "2024-04-12T20:12:09Z"
  },
  "name": "ControllerAccessToken",
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
        "SpecialProperty": "true"
      }
    },
    "instance": {
      "type": "STRING",
      "required": true
    },
    "token": {
      "type": "STRING"
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

