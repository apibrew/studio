
export interface InstanceControllerToken {
    id: string
    version: number
}

export const InstanceControllerTokenEntityInfo = {
    namespace: "default",
    resource: "InstanceControllerToken",
    restPath: "instance-controller-token",
}

export const InstanceControllerTokenResource = {
  "auditData": {
    "createdBy": "admin@admin.com",
    "createdOn": "2024-04-12T11:50:24Z"
  },
  "name": "InstanceControllerToken",
  "namespace": {
    "name": "default"
  },
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

