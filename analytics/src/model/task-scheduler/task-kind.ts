
export interface TaskKind {
    version: number
    parameters?: string[]
    description?: string
    id: string
    name: string
}

export const TaskKindEntityInfo = {
    namespace: "task-scheduler",
    resource: "TaskKind",
    restPath: "task-scheduler-task-kind",
}

export const TaskKindResource = {
  "auditData": {
    "createdBy": "system",
    "updatedBy": "system",
    "createdOn": "2024-07-05T06:27:31Z",
    "updatedOn": "2024-07-05T15:08:21Z"
  },
  "name": "TaskKind",
  "namespace": {
    "name": "task-scheduler"
  },
  "properties": {
    "description": {
      "type": "STRING",
      "unique": true,
      "annotations": {
        "SourceMatchKey": "bcc80791ccfc"
      }
    },
    "id": {
      "type": "UUID",
      "primary": true,
      "required": true,
      "immutable": true,
      "exampleValue": "a39621a4-6d48-11ee-b962-0242ac120002",
      "annotations": {
        "SourceMatchKey": "07a3a510a0a5",
        "SpecialProperty": "true"
      }
    },
    "name": {
      "type": "STRING",
      "required": true,
      "unique": true,
      "immutable": true,
      "annotations": {
        "SourceMatchKey": "367dc092b382"
      }
    },
    "parameters": {
      "type": "LIST",
      "item": {
        "type": "STRING"
      },
      "annotations": {
        "SourceMatchKey": "73e419522190"
      }
    },
    "version": {
      "type": "INT32",
      "required": true,
      "defaultValue": 1,
      "exampleValue": 1,
      "annotations": {
        "AllowEmptyPrimitive": "true",
        "SourceMatchKey": "f5c922f78a10",
        "SpecialProperty": "true"
      }
    }
  }
} as unknown

