import {TaskRun} from './task-run';

export interface TaskRunLog {
    taskRun: TaskRun
    version: number
    timestamp?: string | Date
    id: string
    level: Level
    message?: string
}

export const TaskRunLogEntityInfo = {
    namespace: "task-scheduler",
    resource: "TaskRunLog",
    restPath: "task-scheduler-task-run-log",
}

export enum Level {
    DEBUG = "DEBUG",
    INFO = "INFO",
    WARNING = "WARNING",
    ERROR = "ERROR",
    FATAL = "FATAL",
}

export const TaskRunLogResource = {
  "auditData": {
    "createdBy": "system",
    "updatedBy": "system",
    "createdOn": "2024-07-05T06:27:31Z",
    "updatedOn": "2024-07-05T10:25:08Z"
  },
  "name": "TaskRunLog",
  "namespace": {
    "name": "task-scheduler"
  },
  "properties": {
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
    "level": {
      "type": "ENUM",
      "required": true,
      "defaultValue": "DEBUG",
      "enumValues": [
        "DEBUG",
        "INFO",
        "WARNING",
        "ERROR",
        "FATAL"
      ],
      "annotations": {
        "SourceMatchKey": "3eb5f109ced1"
      }
    },
    "message": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "2bad5905d57f"
      }
    },
    "taskRun": {
      "type": "REFERENCE",
      "required": true,
      "reference": "task-scheduler/TaskRun",
      "annotations": {
        "SourceMatchKey": "407599a2a129"
      }
    },
    "timestamp": {
      "type": "TIMESTAMP",
      "annotations": {
        "SourceMatchKey": "5bd25bd08c90"
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

