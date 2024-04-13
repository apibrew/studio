import {Payment} from './payment';
import {Instance} from './instance';
import {InstancePlan} from './instance-plan';

export interface Invoice {
    executionStatus: ExecutionStatus
    status: Status
    payment?: Payment
    currency: string
    auditData?: AuditData
    amount: number
    paymentDate?: string | Date
    items: InvoiceItem[]
    notes?: string
    version: number
    id: string
    user: string
}

export const InvoiceEntityInfo = {
    namespace: "default",
    resource: "Invoice",
    restPath: "invoice",
}

export interface InvoiceItem {
    instance: Instance
    monthCount: number
    instancePreviousPlanName: string
    instancePreviousPlanUntil: string | Date
    plan: InstancePlan
}

export interface AuditData {
    createdBy: string
    createdOn: string | Date
    updatedBy: string
    updatedOn: string | Date
}

export enum ExecutionStatus {
    PENDING = "PENDING",
    EXECUTING = "EXECUTING",
    EXECUTED = "EXECUTED",
    FAILED = "FAILED",
}

export enum Status {
    PENDING = "PENDING",
    PAID = "PAID",
}

export const InvoiceResource = {
  "auditData": {
    "createdBy": "admin",
    "updatedBy": "system",
    "createdOn": "2024-01-06T21:56:20Z",
    "updatedOn": "2024-04-12T19:16:01Z"
  },
  "name": "Invoice",
  "namespace": {
    "name": "default"
  },
  "properties": {
    "amount": {
      "type": "INT32",
      "required": true,
      "description": "The amount of the payment"
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
    "currency": {
      "type": "STRING",
      "required": true,
      "description": "The currency of the payment"
    },
    "executionStatus": {
      "type": "ENUM",
      "required": true,
      "defaultValue": "PENDING",
      "enumValues": [
        "PENDING",
        "EXECUTING",
        "EXECUTED",
        "FAILED"
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
    "items": {
      "type": "LIST",
      "required": true,
      "item": {
        "type": "STRUCT",
        "typeRef": "InvoiceItem"
      }
    },
    "notes": {
      "type": "STRING",
      "length": 1024,
      "description": "The notes of the payment"
    },
    "payment": {
      "type": "REFERENCE",
      "reference": "default/Payment",
      "description": "The payment of the payment"
    },
    "paymentDate": {
      "type": "TIMESTAMP",
      "description": "The date of the payment"
    },
    "status": {
      "type": "ENUM",
      "required": true,
      "defaultValue": "PENDING",
      "enumValues": [
        "PENDING",
        "PAID"
      ]
    },
    "user": {
      "type": "STRING",
      "required": true,
      "description": "The user of the payment"
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
      "name": "InvoiceItem",
      "title": "",
      "description": "",
      "properties": {
        "instance": {
          "type": "REFERENCE",
          "required": true,
          "reference": "default/Instance",
          "description": "The instance of the payment"
        },
        "instancePreviousPlanName": {
          "type": "STRING"
        },
        "instancePreviousPlanUntil": {
          "type": "TIMESTAMP"
        },
        "monthCount": {
          "type": "INT32",
          "required": true,
          "description": "The amount of the payment"
        },
        "plan": {
          "type": "REFERENCE",
          "required": true,
          "reference": "default/InstancePlan",
          "description": "The plan of the payment"
        }
      }
    },
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

