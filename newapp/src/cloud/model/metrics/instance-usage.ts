import {Instance} from '../instance';

export interface InstanceUsage {
    metric: Metric
    result?: MetricItem[]
    version: number
    duration: Duration
    instance: Instance
    id: string
    debug?: string
    owner: string
}

export const InstanceUsageEntityInfo = {
    namespace: "metrics",
    resource: "InstanceUsage",
    restPath: "metrics-instance-usage",
}

export interface MetricItem {
    tags: any
    time: string
    value: number
}

export enum Metric {
    REQUEST = "REQUEST",
    NANO_EXECUTION = "NANO_EXECUTION",
    STORAGE = "STORAGE",
}

export enum Duration {
    TODAY = "TODAY",
    THIS_WEEK = "THIS_WEEK",
    THIS_MONTH = "THIS_MONTH",
    PAST_MONTH = "PAST_MONTH",
    LAST_6_MONTHS = "LAST_6_MONTHS",
    LAST_YEAR = "LAST_YEAR",
}

export const InstanceUsageResource = {
  "auditData": {
    "createdBy": "admin",
    "updatedBy": "admin",
    "createdOn": "2024-05-19T20:50:58Z",
    "updatedOn": "2024-08-27T18:24:33Z"
  },
  "name": "InstanceUsage",
  "namespace": {
    "name": "metrics"
  },
  "virtual": true,
  "properties": {
    "debug": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "4e56f4b9ab75"
      }
    },
    "duration": {
      "type": "ENUM",
      "required": true,
      "defaultValue": "TODAY",
      "enumValues": [
        "TODAY",
        "THIS_WEEK",
        "THIS_MONTH",
        "PAST_MONTH",
        "LAST_6_MONTHS",
        "LAST_YEAR"
      ],
      "annotations": {
        "SourceMatchKey": "ca39e7a547fd"
      }
    },
    "id": {
      "type": "UUID",
      "primary": true,
      "required": true,
      "immutable": true,
      "exampleValue": "a39621a4-6d48-11ee-b962-0242ac120002",
      "description": "The unique identifier of the resource. It is randomly generated and immutable.",
      "annotations": {
        "Order": "0",
        "SourceMatchKey": "8973c36ee184",
        "SpecialProperty": "true"
      }
    },
    "instance": {
      "type": "REFERENCE",
      "required": true,
      "reference": "default/Instance",
      "annotations": {
        "Order": "1",
        "SourceMatchKey": "c3aee54b292c"
      }
    },
    "metric": {
      "type": "ENUM",
      "required": true,
      "defaultValue": "REQUEST",
      "enumValues": [
        "REQUEST",
        "NANO_EXECUTION",
        "STORAGE"
      ],
      "annotations": {
        "Order": "3",
        "SourceMatchKey": "892f978d4d33"
      }
    },
    "owner": {
      "type": "STRING",
      "required": true,
      "annotations": {
        "Order": "2",
        "SourceMatchKey": "7911d1a4e44f"
      }
    },
    "result": {
      "type": "LIST",
      "item": {
        "type": "STRUCT",
        "typeRef": "MetricItem"
      },
      "annotations": {
        "ActionOutputProperty": "true",
        "PropertyEditor": "Table Editor",
        "SourceMatchKey": "d5f16f90c9fc"
      }
    },
    "version": {
      "type": "INT32",
      "required": true,
      "defaultValue": 1,
      "exampleValue": 1,
      "title": "Version",
      "description": "The version of the resource/record. It is incremented on every update.",
      "annotations": {
        "AllowEmptyPrimitive": "true",
        "SourceMatchKey": "0b23f1f9d15d",
        "SpecialProperty": "true"
      }
    }
  },
  "types": [
    {
      "name": "MetricItem",
      "title": "",
      "description": "",
      "properties": {
        "tags": {
          "type": "OBJECT"
        },
        "time": {
          "type": "TIMESTAMP",
          "required": true
        },
        "value": {
          "type": "FLOAT64"
        }
      }
    }
  ],
  "annotations": {
    "ActionApi": "true"
  }
} as unknown

