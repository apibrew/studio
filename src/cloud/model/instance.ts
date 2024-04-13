import {InstancePlan} from './instance-plan';
import {Database} from './database';

export interface Instance {
    modules?: { [key: string]: string }
    plan?: InstancePlan
    deploymentStatus: DeploymentStatus
    health: Health
    namespace: string
    auditData?: AuditData
    database: Database
    paidPlanUntil?: string | Date
    owner?: string
    backendVersion: string
    additionalConfig?: object
    controllerAccessToken?: string
    title?: string
    cluster: string
    id: string
    name: string
    adminPassword?: string
    description?: string
    replicaCount: number
    version: number
}

export const InstanceEntityInfo = {
    namespace: "default",
    resource: "Instance",
    restPath: "instance",
}

export interface AuditData {
    createdBy: string
    createdOn: string | Date
    updatedBy: string
    updatedOn: string | Date
}

export enum DeploymentStatus {
    PENDING = "PENDING",
    PENDING_DEPLOY = "PENDING_DEPLOY",
    DEPLOYED = "DEPLOYED",
    DEPLOY_FAILED = "DEPLOY_FAILED",
    PENDING_DESTROY = "PENDING_DESTROY",
    DESTROYED = "DESTROYED",
    DESTROY_FAILED = "DESTROY_FAILED",
}

export enum Health {
    HEALTHY = "HEALTHY",
    UNHEALTHY = "UNHEALTHY",
}

export const InstanceResource = {
  "auditData": {
    "createdBy": "admin",
    "updatedBy": "system",
    "createdOn": "2024-01-06T21:56:15Z",
    "updatedOn": "2024-04-12T19:16:01Z"
  },
  "name": "Instance",
  "namespace": {
    "name": "default"
  },
  "properties": {
    "additionalConfig": {
      "type": "OBJECT"
    },
    "adminPassword": {
      "type": "STRING",
      "description": "The admin password of the instance"
    },
    "auditData": {
      "type": "STRUCT",
      "typeRef": "AuditData",
      "exampleValue": {
        "createdBy": "admin",
        "createdOn": "2024-04-12T19:16:01Z",
        "updatedBy": "admin",
        "updatedOn": "2024-04-12T19:16:01Z"
      },
      "title": "Audit Data",
      "description": "The audit data of the resource/record. \nIt contains information about who created the resource/record, when it was created, who last updated the resource/record and when it was last updated.",
      "annotations": {
        "SpecialProperty": "true"
      }
    },
    "backendVersion": {
      "type": "STRING",
      "required": true,
      "defaultValue": "1.0.0",
      "description": "The version of the api-brew"
    },
    "cluster": {
      "type": "STRING",
      "required": true,
      "defaultValue": "default",
      "description": "The cluster of the instance"
    },
    "controllerAccessToken": {
      "type": "STRING",
      "length": 5000,
      "description": "The controller access token of the instance"
    },
    "database": {
      "type": "REFERENCE",
      "required": true,
      "reference": "default/Database"
    },
    "deploymentStatus": {
      "type": "ENUM",
      "required": true,
      "defaultValue": "PENDING",
      "enumValues": [
        "PENDING",
        "PENDING_DEPLOY",
        "DEPLOYED",
        "DEPLOY_FAILED",
        "PENDING_DESTROY",
        "DESTROYED",
        "DESTROY_FAILED"
      ]
    },
    "description": {
      "type": "STRING"
    },
    "health": {
      "type": "ENUM",
      "required": true,
      "defaultValue": "HEALTHY",
      "enumValues": [
        "HEALTHY",
        "UNHEALTHY"
      ]
    },
    "id": {
      "type": "UUID",
      "primary": true,
      "required": true,
      "immutable": true,
      "exampleValue": "a39621a4-6d48-11ee-b962-0242ac120002",
      "description": "The unique identifier of the resource. It is randomly generated and immutable.",
      "annotations": {
        "SpecialProperty": "true"
      }
    },
    "modules": {
      "type": "MAP",
      "item": {
        "type": "STRING"
      }
    },
    "name": {
      "type": "STRING",
      "required": true,
      "unique": true,
      "immutable": true,
      "description": "The name of the account"
    },
    "namespace": {
      "type": "STRING",
      "required": true,
      "defaultValue": "instances",
      "description": "The namespace of the instance"
    },
    "owner": {
      "type": "STRING"
    },
    "paidPlanUntil": {
      "type": "TIMESTAMP"
    },
    "plan": {
      "type": "REFERENCE",
      "reference": "default/InstancePlan"
    },
    "replicaCount": {
      "type": "INT32",
      "required": true,
      "defaultValue": 1,
      "description": "The number of replicas of the instance"
    },
    "title": {
      "type": "STRING"
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
          "exampleValue": "2024-04-12T19:16:01Z",
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
          "exampleValue": "2024-04-12T19:16:01Z",
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
    "EnableAudit": "true"
  }
} as unknown

