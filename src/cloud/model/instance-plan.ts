
export interface InstancePlan {
    limits?: PlanLimits
    version: number
    currency: string
    auditData?: AuditData
    attributes?: { [key: string]: string }
    id: string
    name: string
    amount: number
}

export const InstancePlanEntityInfo = {
    namespace: "default",
    resource: "InstancePlan",
    restPath: "instance-plan",
}

export interface PlanLimits {
    maxResourceCount: number
    requestPerMinute: number
    maxNamespaceCount: number
    maxRecordCount: number
}

export interface AuditData {
    updatedOn: string | Date
    createdBy: string
    createdOn: string | Date
    updatedBy: string
}

export const InstancePlanResource = {
  "auditData": {
    "createdBy": "system",
    "updatedBy": "system",
    "createdOn": "2023-11-29T11:44:38Z",
    "updatedOn": "2024-01-06T13:08:00Z"
  },
  "name": "InstancePlan",
  "namespace": {
    "name": "default"
  },
  "properties": {
    "amount": {
      "type": "INT32",
      "required": true,
      "description": "The amount of the payment"
    },
    "attributes": {
      "type": "MAP",
      "item": {
        "type": "STRING"
      }
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
    "limits": {
      "type": "STRUCT",
      "typeRef": "PlanLimits"
    },
    "name": {
      "type": "STRING",
      "required": true,
      "unique": true,
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
      "name": "PlanLimits",
      "title": "",
      "description": "",
      "properties": {
        "maxNamespaceCount": {
          "type": "INT32",
          "description": "The max namespace count"
        },
        "maxRecordCount": {
          "type": "INT32",
          "description": "The max record count"
        },
        "maxResourceCount": {
          "type": "INT32",
          "description": "The max resource count"
        },
        "requestPerMinute": {
          "type": "INT32",
          "description": "The request per minute"
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

