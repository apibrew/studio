
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
    host: string
    port: string
    dbName: string
    password: string
    username: string
    defaultSchema: string
}

export interface AuditData {
    createdBy: string
    createdOn: string
    updatedBy: string
    updatedOn: string
}

export const DatabaseResource = {
  "auditData": {
    "createdBy": "admin",
    "updatedBy": "system",
    "createdOn": "2024-01-06T21:56:15Z",
    "updatedOn": "2024-04-12T19:16:01Z"
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
    "config": {
      "type": "STRUCT",
      "typeRef": "DbConfig",
      "required": true,
      "description": "The configuration of the database"
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

