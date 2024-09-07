
export interface AccountPlan {
    attributes?: { [key: string]: string }
    id: string
    name: string
    amount: number
    limits?: PlanLimits
    version: number
    currency: string
    auditData?: AuditData
}

export const AccountPlanEntityInfo = {
    namespace: "default",
    resource: "AccountPlan",
    restPath: "account-plan",
}

export interface PlanLimits {
    maxResourceCount: number
    requestPerMinute: number
    maxNamespaceCount: number
    maxRecordCount: number
}

export interface AuditData {
    createdOn: string
    updatedBy: string
    updatedOn: string
    createdBy: string
}

export const AccountPlanResource = {
  "auditData": {
    "createdBy": "admin",
    "updatedBy": "system",
    "createdOn": "2024-08-28T18:13:13Z",
    "updatedOn": "2024-04-12T19:16:01Z"
  },
  "name": "AccountPlan",
  "namespace": {
    "name": "default"
  },
  "properties": {
    "amount": {
      "type": "INT32",
      "required": true,
      "description": "The amount of the payment",
      "annotations": {
        "SourceMatchKey": "c32736b1050a"
      }
    },
    "attributes": {
      "type": "MAP",
      "item": {
        "type": "STRING"
      },
      "annotations": {
        "SourceMatchKey": "7878061a4d34"
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
        "SourceMatchKey": "962f3e1d248b",
        "SpecialProperty": "true"
      }
    },
    "currency": {
      "type": "STRING",
      "required": true,
      "description": "The currency of the payment",
      "annotations": {
        "SourceMatchKey": "7b6b707fdab4"
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
        "SourceMatchKey": "475c7ce00c0c",
        "SpecialProperty": "true"
      }
    },
    "limits": {
      "type": "STRUCT",
      "typeRef": "PlanLimits",
      "annotations": {
        "SourceMatchKey": "7ab3af2f6256"
      }
    },
    "name": {
      "type": "STRING",
      "required": true,
      "unique": true,
      "description": "The user of the payment",
      "annotations": {
        "SourceMatchKey": "c5108f7ca4cf"
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
        "SourceMatchKey": "918f0d1b9476",
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

