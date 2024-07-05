
export interface OrganizationRaw {
    auditData?: AuditData
    organization_uuid: string
    id: string
    api_raw?: object
    version: number
    data_raw?: object
}

export const OrganizationRawEntityInfo = {
    namespace: "default",
    resource: "OrganizationRaw",
    restPath: "organization-raw",
}

export interface AuditData {
    createdBy: string
    createdOn: string | Date
    updatedBy: string
    updatedOn: string | Date
}

export const OrganizationRawResource = {
  "auditData": {
    "createdBy": ""
  },
  "name": "OrganizationRaw",
  "namespace": {
    "name": "default"
  },
  "properties": {
    "api_raw": {
      "type": "OBJECT",
      "description": "Raw data from the API",
      "annotations": {
        "Order": "2",
        "SourceMatchKey": "2b89cfeb61aa"
      }
    },
    "auditData": {
      "type": "STRUCT",
      "typeRef": "AuditData",
      "exampleValue": {
        "createdBy": "admin",
        "createdOn": "2024-06-03T18:17:41+04:00",
        "updatedBy": "admin",
        "updatedOn": "2024-06-03T18:17:41+04:00"
      },
      "title": "Audit Data",
      "description": "The audit data of the resource/record. \nIt contains information about who created the resource/record, when it was created, who last updated the resource/record and when it was last updated.",
      "annotations": {
        "SourceMatchKey": "3648362150c9",
        "SpecialProperty": "true"
      }
    },
    "data_raw": {
      "type": "OBJECT",
      "description": "Raw data from the API",
      "annotations": {
        "Order": "3",
        "SourceMatchKey": "076bd90a0851"
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
        "SourceMatchKey": "102fab01d4c7",
        "SpecialProperty": "true"
      }
    },
    "organization_uuid": {
      "type": "UUID",
      "required": true,
      "unique": true,
      "annotations": {
        "Order": "1",
        "SourceMatchKey": "9084437013a9"
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
        "SourceMatchKey": "327c5198500d",
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
          "exampleValue": "2024-06-03T18:17:41+04:00",
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
          "exampleValue": "2024-06-03T18:17:41+04:00",
          "title": "Updated On",
          "description": "The timestamp when the resource/record was last updated.",
          "annotations": {
            "SpecialProperty": "true"
          }
        }
      }
    }
  ],
  "description": "Identifier schema",
  "annotations": {
    "EnableAudit": "true"
  }
} as unknown

