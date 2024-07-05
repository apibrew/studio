
export interface Virtual1 {
    version: number
    id: string
}

export const Virtual1EntityInfo = {
    namespace: "default",
    resource: "Virtual1",
    restPath: "virtual1",
}

export const Virtual1Resource = {
  "auditData": {
    "createdBy": "system",
    "updatedBy": "system",
    "createdOn": "2024-06-06T21:27:44Z",
    "updatedOn": "2024-06-06T21:27:53Z"
  },
  "name": "Virtual1",
  "namespace": {
    "name": "default"
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
        "SourceMatchKey": "5f6873de8925",
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
        "SourceMatchKey": "14f799bcf35a",
        "SpecialProperty": "true"
      }
    }
  }
} as unknown

