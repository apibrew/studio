import {TaskKind} from './task-kind';

export interface Task {
    auditData?: AuditData
    lastExecutionTime?: string
    id: string
    kind: TaskKind
    name: string
    tags?: string[]
    version: number
    arguments?: { [key: string]: any }
}

export const TaskEntityInfo = {
    namespace: "task-scheduler",
    resource: "Task",
    restPath: "task-scheduler-task",
}

export interface AuditData {
    createdBy: string
    createdOn: string
    updatedBy: string
    updatedOn: string
}

export const TaskResource = {
  "auditData": {
    "createdBy": "system",
    "updatedBy": "system",
    "createdOn": "2024-07-05T06:27:31Z",
    "updatedOn": "2024-07-09T18:06:24Z"
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
        "SourceMatchKey": "14edcc38ce30"
      }
    },
    "auditData": {
      "type": "STRUCT",
      "typeRef": "AuditData",
      "exampleValue": {
        "createdBy": "admin",
        "createdOn": "2024-07-05T19:06:59+04:00",
        "updatedBy": "admin",
        "updatedOn": "2024-07-05T19:06:59+04:00"
      },
      "annotations": {
        "SourceMatchKey": "dfea312029e6",
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
        "SourceMatchKey": "07a3a510a0a5",
        "SpecialProperty": "true"
      }
    },
    "kind": {
      "type": "REFERENCE",
      "required": true,
      "immutable": true,
      "reference": "task-scheduler/TaskKind",
      "annotations": {
        "SourceMatchKey": "d01aa99462c0"
      }
    },
    "lastExecutionTime": {
      "type": "TIMESTAMP",
      "annotations": {
        "SourceMatchKey": "717b0fc76254"
      }
    },
    "name": {
      "type": "STRING",
      "required": true,
      "unique": true,
      "annotations": {
        "SourceMatchKey": "d8d12176196f"
      }
    },
    "tags": {
      "type": "LIST",
      "item": {
        "type": "STRING"
      },
      "annotations": {
        "SourceMatchKey": "30adfdcd3d0f"
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
          "exampleValue": "2024-07-05T19:06:59+04:00",
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
          "exampleValue": "2024-07-05T19:06:59+04:00",
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

