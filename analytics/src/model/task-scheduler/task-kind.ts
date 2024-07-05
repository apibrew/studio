
export interface TaskKind {
    description?: string
    id: string
    name: string
    version: number
    parameters?: string[]
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
    "updatedOn": "2024-07-05T10:25:08Z"
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
        "SourceMatchKey": "0d282b7df900"
      }
    },
    "id": {
      "type": "UUID",
      "primary": true,
      "required": true,
      "immutable": true,
      "exampleValue": "a39621a4-6d48-11ee-b962-0242ac120002",
      "annotations": {
        "SourceMatchKey": "ba19471f90e8",
        "SpecialProperty": "true"
      }
    },
    "name": {
      "type": "STRING",
      "required": true,
      "unique": true,
      "immutable": true,
      "annotations": {
        "SourceMatchKey": "7354e6779dc7"
      }
    },
    "parameters": {
      "type": "LIST",
      "item": {
        "type": "STRING"
      },
      "annotations": {
        "SourceMatchKey": "08ec9fe45a43"
      }
    },
    "version": {
      "type": "INT32",
      "required": true,
      "defaultValue": 1,
      "exampleValue": 1,
      "annotations": {
        "AllowEmptyPrimitive": "true",
        "SourceMatchKey": "f1d99b6f0bd3",
        "SpecialProperty": "true"
      }
    }
  }
} as unknown

