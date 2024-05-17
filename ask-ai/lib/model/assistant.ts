
export interface Assistant {
    name: string
    label: string
    version: number
    id: string
}

export const AssistantEntityInfo = {
    namespace: "ask-ai",
    resource: "Assistant",
    restPath: "ask-ai-assistant",
}

export const AssistantResource = {
  "auditData": {
    "createdBy": "admin@admin.com",
    "updatedBy": "admin@admin.com",
    "createdOn": "2024-04-29T05:20:13Z",
    "updatedOn": "2024-04-29T05:27:14Z"
  },
  "name": "Assistant",
  "namespace": {
    "name": "ask-ai"
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
    "label": {
      "type": "STRING",
      "required": true
    },
    "name": {
      "type": "STRING",
      "required": true
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

