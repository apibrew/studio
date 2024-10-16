
export interface ControllerAccessToken {
    username?: string
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
    "updatedBy": "admin",
    "createdOn": "2024-04-12T11:53:00Z",
    "updatedOn": "2024-05-20T15:08:16Z"
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
        "Order": "0",
        "SourceMatchKey": "2bf89d484358",
        "SpecialProperty": "true"
      }
    },
    "instance": {
      "type": "STRING",
      "required": true,
      "annotations": {
        "Order": "1",
        "SourceMatchKey": "2bb9f21aca35"
      }
    },
    "token": {
      "type": "STRING",
      "annotations": {
        "Order": "3",
        "SourceMatchKey": "e68ca5cf1061"
      }
    },
    "username": {
      "type": "STRING",
      "annotations": {
        "Order": "2",
        "SourceMatchKey": "a5f70bfa69f4"
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
        "SourceMatchKey": "70d751f40ff3",
        "SpecialProperty": "true"
      }
    }
  },
  "annotations": {
    "ActionApi": "true"
  }
} as unknown

