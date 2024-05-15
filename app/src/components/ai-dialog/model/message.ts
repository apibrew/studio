import {Chat} from './chat';

export interface Message {
    text: string
    order: number
    version: number
    id: string
    chat: Chat
    role: Role
}

export const MessageEntityInfo = {
    namespace: "ai",
    resource: "Message",
    restPath: "ai-message",
}

export enum Role {
    USER = "USER",
    ASSISTANT = "ASSISTANT",
}

export const MessageResource = {
  "auditData": {
    "createdBy": "system",
    "createdOn": "2024-03-01T10:48:40Z"
  },
  "name": "Message",
  "namespace": {
    "name": "ai"
  },
  "properties": {
    "chat": {
      "type": "REFERENCE",
      "required": true,
      "reference": "ai/Chat"
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
    "order": {
      "type": "INT32",
      "required": true
    },
    "role": {
      "type": "ENUM",
      "required": true,
      "enumValues": [
        "USER",
        "ASSISTANT"
      ]
    },
    "text": {
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

