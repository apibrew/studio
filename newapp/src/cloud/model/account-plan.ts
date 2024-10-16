
export interface AccountPlan {
    version: number
    popular?: boolean
    currency: string
    attributes?: { [key: string]: string }
    limits?: PlanLimits
    allowUserToChoose?: boolean
    name: string
    amount: number
    order?: number
    summary?: string
    keyFeatures?: string[]
    id: string
    features?: string[]
    auditData?: AuditData
}

export const AccountPlanEntityInfo = {
    namespace: "default",
    resource: "AccountPlan",
    restPath: "account-plan",
}

export interface PlanLimits {
    maxRecordCount: number
    maxResourceCount: number
    requestPerMinute: number
    maxNamespaceCount: number
}

export interface AuditData {
    createdBy: string
    createdOn: string
    updatedBy: string
    updatedOn: string
}

export const AccountPlanResource = {
  "auditData": {
    "createdBy": "admin",
    "updatedBy": "admin",
    "createdOn": "2024-08-28T18:13:13Z",
    "updatedOn": "2024-10-10T09:26:09Z"
  },
  "name": "AccountPlan",
  "namespace": {
    "name": "default"
  },
  "properties": {
    "allowUserToChoose": {
      "type": "BOOL",
      "annotations": {
        "Order": "4",
        "SourceMatchKey": "877c95ae742c"
      }
    },
    "amount": {
      "type": "INT32",
      "required": true,
      "description": "The amount of the payment",
      "annotations": {
        "Order": "2",
        "SourceMatchKey": "c32736b1050a"
      }
    },
    "attributes": {
      "type": "MAP",
      "item": {
        "type": "STRING"
      },
      "annotations": {
        "Order": "5",
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
        "Order": "3",
        "SourceMatchKey": "7b6b707fdab4"
      }
    },
    "features": {
      "type": "LIST",
      "item": {
        "type": "STRING",
        "length": 255
      },
      "annotations": {
        "Order": "6",
        "SourceMatchKey": "eaf86c2032ea"
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
        "SourceMatchKey": "475c7ce00c0c",
        "SpecialProperty": "true"
      }
    },
    "keyFeatures": {
      "type": "LIST",
      "item": {
        "type": "STRING",
        "length": 1024
      },
      "annotations": {
        "Order": "7",
        "SourceMatchKey": "5f1d878e08dc"
      }
    },
    "limits": {
      "type": "STRUCT",
      "typeRef": "PlanLimits",
      "annotations": {
        "Order": "8",
        "SourceMatchKey": "7ab3af2f6256"
      }
    },
    "name": {
      "type": "STRING",
      "required": true,
      "unique": true,
      "description": "The user of the payment",
      "annotations": {
        "Order": "1",
        "SourceMatchKey": "c5108f7ca4cf"
      }
    },
    "order": {
      "type": "INT32",
      "annotations": {
        "SourceMatchKey": "bb0263845683"
      }
    },
    "popular": {
      "type": "BOOL",
      "annotations": {
        "SourceMatchKey": "ac9b089fdd8a"
      }
    },
    "summary": {
      "type": "STRING",
      "length": 255,
      "annotations": {
        "SourceMatchKey": "2e61f6c0e885"
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
    "AllowPublicGetAccess": "true",
    "EnableAudit": "true"
  }
} as unknown

