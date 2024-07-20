import {TaskRun} from './task-run';

export interface TaskRunProgress {
    completed?: number
    itemCount?: number
    version: number
    step?: number
    total?: number
    duration?: number
    taskRun: TaskRun
    timestamp?: string
    cumDuration?: number
    id: string
}

export const TaskRunProgressEntityInfo = {
    namespace: "task-scheduler",
    resource: "TaskRunProgress",
    restPath: "task-scheduler-task-run-progress",
}

export const TaskRunProgressResource = {
  "auditData": {
    "createdBy": "system",
    "updatedBy": "system",
    "createdOn": "2024-07-05T06:27:31Z",
    "updatedOn": "2024-07-18T09:31:08Z"
  },
  "name": "TaskRunProgress",
  "namespace": {
    "name": "task-scheduler"
  },
  "properties": {
    "completed": {
      "type": "INT64",
      "annotations": {
        "SourceMatchKey": "824eceefc8f8"
      }
    },
    "cumDuration": {
      "type": "INT64",
      "annotations": {
        "SourceMatchKey": "2314b7988db8"
      }
    },
    "duration": {
      "type": "INT64",
      "annotations": {
        "SourceMatchKey": "8b6d9e2d4b14"
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
    "itemCount": {
      "type": "INT64",
      "annotations": {
        "SourceMatchKey": "95d3492ad6a7"
      }
    },
    "step": {
      "type": "INT32",
      "annotations": {
        "SourceMatchKey": "e5f413fe4adc"
      }
    },
    "taskRun": {
      "type": "REFERENCE",
      "required": true,
      "reference": "task-scheduler/TaskRun",
      "annotations": {
        "SourceMatchKey": "d042baaa7242"
      }
    },
    "timestamp": {
      "type": "TIMESTAMP",
      "annotations": {
        "SourceMatchKey": "028539a15f98"
      }
    },
    "total": {
      "type": "INT64",
      "annotations": {
        "SourceMatchKey": "2957bda82484"
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

