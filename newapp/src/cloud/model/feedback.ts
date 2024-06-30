
export interface Feedback {
    id: string
    message?: string
    version: number
    connection: string
    parameters?: object
    p?: string
}

export const FeedbackEntityInfo = {
    namespace: "default",
    resource: "Feedback",
    restPath: "feedback",
}

export const FeedbackResource = {
  "auditData": {
    "createdBy": "admin",
    "updatedBy": "system",
    "createdOn": "2024-02-15T16:52:33Z",
    "updatedOn": "2024-04-12T19:16:01Z"
  },
  "name": "Feedback",
  "namespace": {
    "name": "default"
  },
  "properties": {
    "connection": {
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
    "message": {
      "type": "STRING"
    },
    "p": {
      "type": "STRING"
    },
    "parameters": {
      "type": "OBJECT"
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
    "AllowPublicCreateAccess": "true"
  }
} as unknown

