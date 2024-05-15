
export interface NanoInstance {
    version: number
    auditData?: AuditData
    annotations?: { [key: string]: string }
    limitations?: InstanceLimitations
    serverConfig: ServerConfig
    id: string
    name: string
}

export const NanoInstanceEntityInfo = {
    namespace: "default",
    resource: "NanoInstance",
    restPath: "nano-instance",
}

export interface ServerConfig {
    host: string
    port: number
    httpPort: number
    insecure: boolean
    authentication: ServerConfigAuthentication
}

export interface ServerConfigAuthentication {
    token: string
    password: string
    username: string
}

export interface InstanceLimitations {
    maxExecutionTime: number
    maxConcurrentExecutions: number
}

export interface AuditData {
    createdBy: string
    createdOn: string | Date
    updatedBy: string
    updatedOn: string | Date
}

export const NanoInstanceResource = {
  "auditData": {
    "createdBy": "system",
    "updatedBy": "system",
    "createdOn": "2023-11-29T11:44:38Z",
    "updatedOn": "2023-12-06T23:40:09Z"
  },
  "name": "NanoInstance",
  "namespace": {
    "name": "default"
  },
  "properties": {
    "annotations": {
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
        "createdOn": "2023-12-06T23:40:09Z",
        "updatedBy": "admin",
        "updatedOn": "2023-12-06T23:40:09Z"
      },
      "title": "Audit Data",
      "description": "The audit data of the resource/record. \nIt contains information about who created the resource/record, when it was created, who last updated the resource/record and when it was last updated.",
      "annotations": {
        "SpecialProperty": "true"
      }
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
    "limitations": {
      "type": "STRUCT",
      "typeRef": "InstanceLimitations"
    },
    "name": {
      "type": "STRING",
      "required": true,
      "unique": true,
      "length": 255
    },
    "serverConfig": {
      "type": "STRUCT",
      "typeRef": "ServerConfig",
      "required": true
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
      "name": "ServerConfig",
      "title": "",
      "description": "",
      "properties": {
        "authentication": {
          "type": "STRUCT",
          "typeRef": "ServerConfigAuthentication",
          "required": true
        },
        "host": {
          "type": "STRING",
          "required": true
        },
        "httpPort": {
          "type": "INT32",
          "required": true
        },
        "insecure": {
          "type": "BOOL",
          "required": true,
          "defaultValue": false
        },
        "port": {
          "type": "INT32",
          "required": true
        }
      }
    },
    {
      "name": "ServerConfigAuthentication",
      "title": "",
      "description": "",
      "properties": {
        "password": {
          "type": "STRING"
        },
        "token": {
          "type": "STRING"
        },
        "username": {
          "type": "STRING"
        }
      }
    },
    {
      "name": "InstanceLimitations",
      "title": "",
      "description": "",
      "properties": {
        "maxConcurrentExecutions": {
          "type": "INT32",
          "defaultValue": 2
        },
        "maxExecutionTime": {
          "type": "INT32",
          "defaultValue": 1500
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
          "exampleValue": "2023-12-06T23:40:09Z",
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
          "exampleValue": "2023-12-06T23:40:09Z",
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

