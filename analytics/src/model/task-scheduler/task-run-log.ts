import {TaskRun} from './task-run';

export interface TaskRunLog {
    version: number
    timestamp?: string
    id: string
    level: Level
    message?: string
    taskRun: TaskRun
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
    "updatedOn": "2024-07-18T09:31:08Z"
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
        "SourceMatchKey": "07a3a510a0a5",
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
        "SourceMatchKey": "3c56e6f138c6"
      }
    },
    "message": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "34a70c5deed9"
      }
    },
    "taskRun": {
      "type": "REFERENCE",
      "required": true,
      "immutable": true,
      "reference": "task-scheduler/TaskRun",
      "annotations": {
        "SourceMatchKey": "6b9da0de8418"
      }
    },
    "timestamp": {
      "type": "TIMESTAMP",
      "annotations": {
        "SourceMatchKey": "bd68d4771e94"
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
  "immutable": true
} as unknown

