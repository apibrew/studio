
export interface Database {
    id: string
    name: string
    config: DbConfig
    version: number
    auditData?: AuditData
}

export const DatabaseEntityInfo = {
    namespace: "default",
    resource: "Database",
    restPath: "database",
}

export interface DbConfig {
    dbName: string
    password: string
    username: string
    defaultSchema: string
    host: string
    port: string
}

export interface AuditData {
    createdBy: string
    createdOn: string | Date
    updatedBy: string
    updatedOn: string | Date
}

export const DatabaseResource = {
  "auditData": {
    "createdBy": "system",
    "updatedBy": "system",
    "createdOn": "2023-11-29T11:44:38Z",
    "updatedOn": "2024-01-06T13:08:00Z"
  },
  "name": "Database",
  "namespace": {
    "name": "default"
  },
  "properties": {
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
    "config": {
      "type": "STRUCT",
      "typeRef": "DbConfig",
      "required": true,
      "description": "The configuration of the database"
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
    "name": {
      "type": "STRING",
      "required": true,
      "unique": true,
      "description": "The name of the account"
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
      "name": "DbConfig",
      "title": "",
      "description": "",
      "properties": {
        "dbName": {
          "type": "STRING",
          "required": true,
          "description": "The name of the database"
        },
        "defaultSchema": {
          "type": "STRING",
          "required": true,
          "description": "The default schema of the database"
        },
        "host": {
          "type": "STRING",
          "required": true,
          "description": "The host of the database"
        },
        "password": {
          "type": "STRING",
          "required": true,
          "description": "The password of the database"
        },
        "port": {
          "type": "STRING",
          "required": true,
          "description": "The port of the database"
        },
        "username": {
          "type": "STRING",
          "required": true,
          "description": "The username of the database"
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

