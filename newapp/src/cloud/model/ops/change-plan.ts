import {AccountPlan} from '../account-plan';
import {Account} from '../account';

export interface ChangePlan {
    version: number
    auditData?: AuditData
    id: string
    plan?: AccountPlan
    account?: Account
}

export const ChangePlanEntityInfo = {
    namespace: "ops",
    resource: "ChangePlan",
    restPath: "ops-change-plan",
}

export interface AuditData {
    createdBy: string
    createdOn: string
    updatedBy: string
    updatedOn: string
}

export const ChangePlanResource = {
  "auditData": {
    "createdBy": "admin",
    "updatedBy": "admin",
    "createdOn": "2024-08-29T11:24:38Z",
    "updatedOn": "2024-08-29T11:27:55Z"
  },
  "name": "ChangePlan",
  "namespace": {
    "name": "ops"
  },
  "properties": {
    "account": {
      "type": "REFERENCE",
      "reference": "default/Account",
      "annotations": {
        "SourceMatchKey": "4f6226d930b8"
      }
    },
    "auditData": {
      "type": "STRUCT",
      "typeRef": "AuditData",
      "exampleValue": {
        "createdBy": "admin",
        "createdOn": "2024-05-19T12:49:19Z",
        "updatedBy": "admin",
        "updatedOn": "2024-05-19T12:49:19Z"
      },
      "title": "Audit Data",
      "description": "The audit data of the resource/record. \nIt contains information about who created the resource/record, when it was created, who last updated the resource/record and when it was last updated.",
      "annotations": {
        "SourceMatchKey": "de208ef8c9e7",
        "SpecialProperty": "true"
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
        "SourceMatchKey": "8973c36ee184",
        "SpecialProperty": "true"
      }
    },
    "plan": {
      "type": "REFERENCE",
      "reference": "default/AccountPlan",
      "annotations": {
        "SourceMatchKey": "3b10514d5d32"
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
          "exampleValue": "2024-05-19T12:49:19Z",
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
          "exampleValue": "2024-05-19T12:49:19Z",
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

