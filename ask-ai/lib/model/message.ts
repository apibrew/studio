import {Thread} from './thread';

export interface Message {
    version: number
    id: string
    name?: string
    role: string
    owner: string
    thread: Thread
    content: string
    auditData: {
        createdBy: string
        updatedBy: string
        createdOn: string
        updatedOn: string
    }
}

export const MessageEntityInfo = {
    namespace: "ask-ai",
    resource: "Message",
    restPath: "ask-ai-message",
}

export const MessageResource = {
    "auditData": {
        "createdBy": "admin@admin.com",
        "updatedBy": "admin@admin.com",
        "createdOn": "2024-04-29T05:23:18Z",
        "updatedOn": "2024-04-29T06:57:53Z"
    },
    "name": "Message",
    "namespace": {
        "name": "ask-ai"
    },
    "properties": {
        "content": {
            "type": "STRING",
            "required": true,
            "length": 10240
        },
        "id": {
            "type": "UUID",
            "primary": true,
            "required": true,
            "immutable": true,
            "exampleValue": "a39621a4-6d48-11ee-b962-0242ac120002",
            "description": "The unique identifier of the resource. It is randomly generated and immutable.",
            "annotations": {
                "Order": "0",
                "SpecialProperty": "true"
            }
        },
        "name": {
            "type": "STRING",
            "unique": true,
            "annotations": {
                "Order": "3"
            }
        },
        "owner": {
            "type": "STRING",
            "required": true,
            "annotations": {
                "Order": "2"
            }
        },
        "role": {
            "type": "STRING",
            "required": true,
            "annotations": {
                "Order": "4"
            }
        },
        "thread": {
            "type": "REFERENCE",
            "required": true,
            "reference": "ask-ai/Thread",
            "annotations": {
                "Order": "5"
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
    },
    "immutable": true
} as unknown

