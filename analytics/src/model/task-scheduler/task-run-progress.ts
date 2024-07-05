import {TaskRun} from './task-run';

export interface TaskRunProgress {
    itemCount?: number
    version: number
    timestamp?: string | Date
    total?: number
    step?: number
    duration?: number
    completed?: number
    id: string
    taskRun: TaskRun
    cumDuration?: number
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
    "updatedOn": "2024-07-05T10:25:08Z"
  },
  "name": "TaskRunProgress",
  "namespace": {
    "name": "task-scheduler"
  },
  "properties": {
    "completed": {
      "type": "INT64",
      "annotations": {
        "SourceMatchKey": "94d05c8ba5ed"
      }
    },
    "cumDuration": {
      "type": "INT64",
      "annotations": {
        "SourceMatchKey": "09522552105c"
      }
    },
    "duration": {
      "type": "INT64",
      "annotations": {
        "SourceMatchKey": "b619aa6333f1"
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
    "itemCount": {
      "type": "INT64",
      "annotations": {
        "SourceMatchKey": "cd7d9d54d38b"
      }
    },
    "step": {
      "type": "INT32",
      "annotations": {
        "SourceMatchKey": "82a37d077614"
      }
    },
    "taskRun": {
      "type": "REFERENCE",
      "required": true,
      "reference": "task-scheduler/TaskRun",
      "annotations": {
        "SourceMatchKey": "cd453ee7717f"
      }
    },
    "timestamp": {
      "type": "TIMESTAMP",
      "annotations": {
        "SourceMatchKey": "36fa57de9561"
      }
    },
    "total": {
      "type": "INT64",
      "annotations": {
        "SourceMatchKey": "5f8ee7495f88"
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

