
export interface Payment {
    amount: number
    responses?: string[]
    paymentDate?: string | Date
    returnUrl?: string
    token?: string
    version: number
    auditData?: AuditData
    id: string
    currency: string
    paymentId?: string
    user: string
    status: Status
}

export const PaymentEntityInfo = {
    namespace: "default",
    resource: "Payment",
    restPath: "payment",
}

export interface AuditData {
    updatedBy: string
    updatedOn: string | Date
    createdBy: string
    createdOn: string | Date
}

export enum Status {
    PENDING = "PENDING",
    EXECUTING = "EXECUTING",
    PAID = "PAID",
    FAILED = "FAILED",
}

export const PaymentResource = {
  "auditData": {
    "createdBy": "system",
    "updatedBy": "system",
    "createdOn": "2023-11-29T11:44:38Z",
    "updatedOn": "2024-01-06T13:08:01Z"
  },
  "name": "Payment",
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
    "currency": {
      "type": "STRING",
      "required": true,
      "description": "The currency of the payment"
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
    "paymentDate": {
      "type": "TIMESTAMP",
      "description": "The date of the payment"
    },
    "paymentId": {
      "type": "STRING",
      "description": "The token of the payment"
    },
    "responses": {
      "type": "LIST",
      "item": {
        "type": "STRING"
      },
      "description": "The responses of the payment"
    },
    "returnUrl": {
      "type": "STRING",
      "description": "The return url of the payment"
    },
    "status": {
      "type": "ENUM",
      "required": true,
      "defaultValue": "PENDING",
      "enumValues": [
        "PENDING",
        "EXECUTING",
        "PAID",
        "FAILED"
      ]
    },
    "token": {
      "type": "STRING",
      "description": "The token of the payment"
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

