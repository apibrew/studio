import {Task} from './task';

export interface TaskRun {
    error?: object
    auditData?: AuditData
    id: string
    endTime?: string | Date
    startTime?: string | Date
    task: Task
    output?: object
    status: Status
    version: number
}

export const TaskRunEntityInfo = {
    namespace: "task-scheduler",
    resource: "TaskRun",
    restPath: "task-scheduler-task-run",
}

export interface AuditData {
    updatedOn: string | Date
    createdBy: string
    createdOn: string | Date
    updatedBy: string
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
    "updatedOn": "2024-07-05T10:25:08Z"
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
        "createdOn": "2024-07-05T10:57:39+04:00",
        "updatedBy": "admin",
        "updatedOn": "2024-07-05T10:57:39+04:00"
      },
      "annotations": {
        "SourceMatchKey": "e73ec79768ba",
        "SpecialProperty": "true"
      }
    },
    "endTime": {
      "type": "TIMESTAMP",
      "annotations": {
        "SourceMatchKey": "041c2d51971a"
      }
    },
    "error": {
      "type": "OBJECT",
      "annotations": {
        "SourceMatchKey": "535b3c0b2ff4"
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
    "output": {
      "type": "OBJECT",
      "annotations": {
        "SourceMatchKey": "817d6219c712"
      }
    },
    "startTime": {
      "type": "TIMESTAMP",
      "annotations": {
        "SourceMatchKey": "ee408e14c505"
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
        "SourceMatchKey": "37514da3258b"
      }
    },
    "task": {
      "type": "REFERENCE",
      "required": true,
      "reference": "task-scheduler/Task",
      "annotations": {
        "SourceMatchKey": "f44630928582"
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

