
export interface Chat {
    id: string
    name: string
    version: number
    description: string
}

export const ChatEntityInfo = {
    namespace: "ai",
    resource: "Chat",
    restPath: "ai-chat",
}

export const ChatResource = {
  "auditData": {
    "createdBy": "system",
    "updatedBy": "system",
    "createdOn": "2024-03-01T10:36:36Z",
    "updatedOn": "2024-03-01T10:48:40Z"
  },
  "name": "Chat",
  "namespace": {
    "name": "ai"
  },
  "properties": {
    "description": {
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
    "name": {
      "type": "STRING",
      "required": true,
      "unique": true
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
  },
  "annotations": {
    "NormalizedResource": "true"
  }
} as unknown

