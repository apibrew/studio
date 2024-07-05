import {TaskKind} from './task-kind';

export interface Task {
    lastExecutionTime?: string | Date
    id: string
    kind: TaskKind
    name: string
    tags?: string[]
    version: number
    arguments?: { [key: string]: object }
    auditData?: AuditData
}

export const TaskEntityInfo = {
    namespace: "task-scheduler",
    resource: "Task",
    restPath: "task-scheduler-task",
}

export interface AuditData {
    createdBy: string
    createdOn: string | Date
    updatedBy: string
    updatedOn: string | Date
}

export const TaskResource = {
  "auditData": {
    "createdBy": "system",
    "updatedBy": "system",
    "createdOn": "2024-07-05T06:27:31Z",
    "updatedOn": "2024-07-05T10:25:08Z"
  },
  "name": "Task",
  "namespace": {
    "name": "task-scheduler"
  },
  "properties": {
    "arguments": {
      "type": "MAP",
      "item": {
        "type": "OBJECT"
      },
      "annotations": {
        "SourceMatchKey": "667441817c51"
      }
    },
    "auditData": {
      "type": "STRUCT",
      "typeRef": "AuditData",
      "exampleValue": {
        "createdBy": "admin",
        "createdOn": "2024-07-05T10:57:39+04:00",
        "updatedBy": "admin",
        "updatedOn": "2024-07-05T10:57:39+04:00"
      },
      "annotations": {
        "SourceMatchKey": "e73ec79768ba",
        "SpecialProperty": "true"
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
    "kind": {
      "type": "REFERENCE",
      "required": true,
      "reference": "task-scheduler/TaskKind",
      "annotations": {
        "SourceMatchKey": "2d9edb21c109"
      }
    },
    "lastExecutionTime": {
      "type": "TIMESTAMP",
      "annotations": {
        "SourceMatchKey": "69c732c4b9f1"
      }
    },
    "name": {
      "type": "STRING",
      "required": true,
      "unique": true,
      "annotations": {
        "SourceMatchKey": "64b662615e69"
      }
    },
    "tags": {
      "type": "LIST",
      "item": {
        "type": "STRING"
      },
      "annotations": {
        "SourceMatchKey": "5864ff644a1d"
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
  },
  "types": [
    {
      "name": "AuditData",
      "title": "Audit Data",
      "description": "Audit Data is a type that represents the audit data of a resource/record. ",
      "properties": {
        "createdBy": {
          "type": "STRING",
          "immutable": true,
          "length": 256,
          "exampleValue": "admin",
          "annotations": {
            "SpecialProperty": "true"
          }
        },
        "createdOn": {
          "type": "TIMESTAMP",
          "immutable": true,
          "exampleValue": "2024-07-05T10:57:39+04:00",
          "annotations": {
            "SpecialProperty": "true"
          }
        },
        "updatedBy": {
          "type": "STRING",
          "length": 256,
          "exampleValue": "admin",
          "annotations": {
            "SpecialProperty": "true"
          }
        },
        "updatedOn": {
          "type": "TIMESTAMP",
          "exampleValue": "2024-07-05T10:57:39+04:00",
          "annotations": {
            "SpecialProperty": "true"
          }
        }
      }
    }
  ],
  "annotations": {
    "EnableAudit": "true"
  }
} as unknown

