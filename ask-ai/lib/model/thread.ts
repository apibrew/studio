import {Assistant} from './assistant';

export interface Thread {
    instance: unknown
    assistant: Assistant
    id: string
    name: string
    title: string
    owner: string
    version: number
    deleted: boolean
}

export const ThreadEntityInfo = {
    namespace: "ask-ai",
    resource: "Thread",
    restPath: "ask-ai-thread",
}

export const ThreadResource = {
    "auditData": {
        "createdBy": "admin@admin.com",
        "updatedBy": "admin@admin.com",
        "createdOn": "2024-04-29T05:22:30Z",
        "updatedOn": "2024-04-29T06:16:50Z"
    },
    "name": "Thread",
    "namespace": {
        "name": "ask-ai"
    },
    "properties": {
        "assistant": {
            "type": "REFERENCE",
            "required": true,
            "reference": "ask-ai/Assistant"
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
        "instance": {
            "type": "REFERENCE",
            "required": true,
            "reference": "default/Instance"
        },
        "name": {
            "type": "STRING",
            "required": true,
            "immutable": true
        },
        "owner": {
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

