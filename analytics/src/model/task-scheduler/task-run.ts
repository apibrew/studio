import {Task} from './task';

export interface TaskRun {
    version: number
    auditData?: AuditData
    startTime?: string
    id: string
    task: Task
    error?: string
    status: Status
    endTime?: string
}

export const TaskRunEntityInfo = {
    namespace: "task-scheduler",
    resource: "TaskRun",
    restPath: "task-scheduler-task-run",
}

export interface AuditData {
    createdBy: string
    createdOn: string
    updatedBy: string
    updatedOn: string
}

export enum Status {
    PENDING = "PENDING",
    RUNNING = "RUNNING",
    SUCCESS = "SUCCESS",
    FAILED = "FAILED",
    CANCELLING = "CANCELLING",
    CANCELLED = "CANCELLED",
}

export const TaskRunResource = {
  "auditData": {
    "createdBy": "system",
    "updatedBy": "system",
    "createdOn": "2024-07-05T06:27:31Z",
    "updatedOn": "2024-07-09T18:06:24Z"
  },
  "name": "TaskRun",
  "namespace": {
    "name": "task-scheduler"
  },
  "properties": {
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
    "endTime": {
      "type": "TIMESTAMP",
      "annotations": {
        "SourceMatchKey": "56594040e6ca"
      }
    },
    "error": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "d00e45c0bf24"
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
    "startTime": {
      "type": "TIMESTAMP",
      "annotations": {
        "SourceMatchKey": "cb7a26455b6a"
      }
    },
    "status": {
      "type": "ENUM",
      "required": true,
      "defaultValue": "PENDING",
      "enumValues": [
        "PENDING",
        "RUNNING",
        "SUCCESS",
        "FAILED",
        "CANCELLING",
        "CANCELLED"
      ],
      "annotations": {
        "SourceMatchKey": "2fde9105580d"
      }
    },
    "task": {
      "type": "REFERENCE",
      "required": true,
      "immutable": true,
      "reference": "task-scheduler/Task",
      "annotations": {
        "SourceMatchKey": "d8a5c779e0db"
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

