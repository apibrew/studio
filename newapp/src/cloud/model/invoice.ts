import {AccountPlan} from './account-plan';
import {Payment} from './payment';
import {Instance} from './instance';

export interface Invoice {
    status: Status
    executionStatus: ExecutionStatus
    monthCount: number
    user: string
    notes?: string
    plan: AccountPlan
    version: number
    currency: string
    auditData?: AuditData
    paymentDate?: string
    amount: number
    payment?: Payment
    id: string
}

export const InvoiceEntityInfo = {
    namespace: "default",
    resource: "Invoice",
    restPath: "invoice",
}

export interface InvoiceItem {
    instancePreviousPlanName: string
    instancePreviousPlanUntil: string
    instance: Instance
    monthCount: number
}

export interface AuditData {
    createdBy: string
    createdOn: string
    updatedBy: string
    updatedOn: string
}

export enum Status {
    PENDING = "PENDING",
    PAID = "PAID",
}

export enum ExecutionStatus {
    PENDING = "PENDING",
    EXECUTING = "EXECUTING",
    EXECUTED = "EXECUTED",
    FAILED = "FAILED",
}

export const InvoiceResource = {
  "auditData": {
    "createdBy": "admin",
    "updatedBy": "admin",
    "createdOn": "2024-01-06T21:56:20Z",
    "updatedOn": "2024-09-07T19:25:29Z"
  },
  "name": "Invoice",
  "namespace": {
    "name": "default"
  },
  "properties": {
    "amount": {
      "type": "INT32",
      "required": true,
      "description": "The amount of the payment",
      "annotations": {
        "SourceMatchKey": "d94c368606d9"
      }
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
        "SourceMatchKey": "7f1da8dc32fa",
        "SpecialProperty": "true"
      }
    },
    "currency": {
      "type": "STRING",
      "required": true,
      "description": "The currency of the payment",
      "annotations": {
        "SourceMatchKey": "9a5d49e89eaa"
      }
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
      ],
      "annotations": {
        "SourceMatchKey": "4c60a2bb6bcd"
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
        "SourceMatchKey": "182097aa9c1f",
        "SpecialProperty": "true"
      }
    },
    "monthCount": {
      "type": "INT32",
      "required": true,
      "defaultValue": 1,
      "annotations": {
        "SourceMatchKey": "333079f2a701"
      }
    },
    "notes": {
      "type": "STRING",
      "length": 1024,
      "description": "The notes of the payment",
      "annotations": {
        "SourceMatchKey": "9022239993f3"
      }
    },
    "payment": {
      "type": "REFERENCE",
      "reference": "default/Payment",
      "description": "The payment of the payment",
      "annotations": {
        "SourceMatchKey": "b81652508bd4"
      }
    },
    "paymentDate": {
      "type": "TIMESTAMP",
      "description": "The date of the payment",
      "annotations": {
        "SourceMatchKey": "e949f3e334ea"
      }
    },
    "plan": {
      "type": "REFERENCE",
      "required": true,
      "reference": "default/AccountPlan",
      "annotations": {
        "SourceMatchKey": "d9d500e2ead2"
      }
    },
    "status": {
      "type": "ENUM",
      "required": true,
      "defaultValue": "PENDING",
      "enumValues": [
        "PENDING",
        "PAID"
      ],
      "annotations": {
        "SourceMatchKey": "c9c9a5e7ee9b"
      }
    },
    "user": {
      "type": "STRING",
      "required": true,
      "description": "The user of the payment",
      "annotations": {
        "SourceMatchKey": "e5894cabaed7"
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
        "SourceMatchKey": "f8cc6f947f15",
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

