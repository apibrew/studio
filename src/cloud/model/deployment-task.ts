import {Instance} from './instance';

export interface DeploymentTask {
    params?: { [key: string]: string }
    user: string
    message?: string
    version: number
    kind: Kind
    auditData?: AuditData
    id: string
    instance: Instance
    status: Status
}

export const DeploymentTaskEntityInfo = {
    namespace: "default",
    resource: "DeploymentTask",
    restPath: "deployment-task",
}

export interface AuditData {
    createdBy: string
    createdOn: string | Date
    updatedBy: string
    updatedOn: string | Date
}

export enum Kind {
    DEPLOY = "DEPLOY",
    UPGRADE = "UPGRADE",
    DESTROY = "DESTROY",
    RESTART = "RESTART",
}

export enum Status {
    PENDING = "PENDING",
    EXECUTING = "EXECUTING",
    EXECUTED = "EXECUTED",
    FAILED = "FAILED",
    DONE = "DONE",
}

export const DeploymentTaskResource = {
  "auditData": {
    "createdBy": "system",
    "updatedBy": "system",
    "createdOn": "2023-11-29T11:44:38Z",
    "updatedOn": "2024-01-06T13:08:01Z"
  },
  "name": "DeploymentTask",
  "namespace": {
    "name": "default"
  },
  "properties": {
    "auditData": {
      "type": "STRUCT",
      "typeRef": "AuditData",
      "exampleValue": {
        "createdBy": "admin",
        "createdOn": "2024-01-06T17:08:00+04:00",
        "updatedBy": "admin",
        "updatedOn": "2024-01-06T17:08:00+04:00"
      },
      "title": "Audit Data",
      "description": "The audit data of the resource/record. \nIt contains information about who created the resource/record, when it was created, who last updated the resource/record and when it was last updated.",
      "annotations": {
        "SpecialProperty": "true"
      }
    },
    "id": {
      "type": "UUID",
      "required": true,
      "immutable": true,
      "exampleValue": "a39621a4-6d48-11ee-b962-0242ac120002",
      "description": "The unique identifier of the resource. It is randomly generated and immutable.",
      "annotations": {
        "PrimaryProperty": "true",
        "SpecialProperty": "true"
      }
    },
    "instance": {
      "type": "REFERENCE",
      "required": true,
      "reference": "default/Instance"
    },
    "kind": {
      "type": "ENUM",
      "required": true,
      "enumValues": [
        "DEPLOY",
        "UPGRADE",
        "DESTROY",
        "RESTART"
      ]
    },
    "message": {
      "type": "STRING",
      "length": 4096
    },
    "params": {
      "type": "MAP",
      "item": {
        "type": "STRING"
      }
    },
    "status": {
      "type": "ENUM",
      "required": true,
      "defaultValue": "PENDING",
      "enumValues": [
        "PENDING",
        "EXECUTING",
        "EXECUTED",
        "FAILED",
        "DONE"
      ]
    },
    "user": {
      "type": "STRING",
      "required": true
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
          "title": "Created By",
          "description": "The user who created the resource/record.",
          "annotations": {
            "SpecialProperty": "true"
          }
        },
        "createdOn": {
          "type": "TIMESTAMP",
          "immutable": true,
          "exampleValue": "2024-01-06T17:08:00+04:00",
          "title": "Created On",
          "description": "The timestamp when the resource/record was created.",
          "annotations": {
            "SpecialProperty": "true"
          }
        },
        "updatedBy": {
          "type": "STRING",
          "length": 256,
          "exampleValue": "admin",
          "title": "Updated By",
          "description": "The user who last updated the resource/record.",
          "annotations": {
            "SpecialProperty": "true"
          }
        },
        "updatedOn": {
          "type": "TIMESTAMP",
          "exampleValue": "2024-01-06T17:08:00+04:00",
          "title": "Updated On",
          "description": "The timestamp when the resource/record was last updated.",
          "annotations": {
            "SpecialProperty": "true"
          }
        }
      }
    }
  ],
  "annotations": {
    "EnableAudit": "true",
    "NormalizedResource": "true"
  }
} as unknown

