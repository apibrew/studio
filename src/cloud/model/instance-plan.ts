
export interface InstancePlan {
    id: string
    name: string
    amount: number
    limits?: PlanLimits
    version: number
    currency: string
    auditData?: AuditData
    attributes?: { [key: string]: string }
}

export const InstancePlanEntityInfo = {
    namespace: "default",
    resource: "InstancePlan",
    restPath: "instance-plan",
}

export interface PlanLimits {
    maxRecordCount: number
    maxResourceCount: number
    requestPerMinute: number
    maxNamespaceCount: number
}

export interface AuditData {
    updatedBy: string
    updatedOn: string | Date
    createdBy: string
    createdOn: string | Date
}

export const InstancePlanResource = {
  "auditData": {
    "createdBy": "admin",
    "updatedBy": "system",
    "createdOn": "2024-01-06T21:56:14Z",
    "updatedOn": "2024-04-12T19:16:01Z"
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

