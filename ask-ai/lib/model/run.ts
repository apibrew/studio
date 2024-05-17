import {Thread} from './thread';

export interface Run {
    instructions?: string
    id: string
    name: string
    owner: string
    status?: string
    thread: Thread
    version: number
}

export const RunEntityInfo = {
    namespace: "ask-ai",
    resource: "Run",
    restPath: "ask-ai-run",
}

export const RunResource = {
  "auditData": {
    "createdBy": "admin@admin.com",
    "updatedBy": "admin@admin.com",
    "createdOn": "2024-04-29T06:15:44Z",
    "updatedOn": "2024-04-29T07:02:09Z"
  },
  "name": "Run",
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
    "instructions": {
      "type": "STRING",
      "length": 1024
    },
    "name": {
      "type": "STRING",
      "required": true
    },
    "owner": {
      "type": "STRING",
      "required": true
    },
    "status": {
      "type": "STRING"
    },
    "thread": {
      "type": "REFERENCE",
      "required": true,
      "reference": "ask-ai/Thread"
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

