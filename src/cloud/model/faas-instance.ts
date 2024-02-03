export interface FaasInstance {
  id: string
  name: string
  serverConfig: ServerConfig
  limitations?: InstanceLimitations
  annotations?: { [key: string]: string }
  version: number
  auditData?: AuditData
}

export const FaasInstanceEntityInfo = {
  namespace: "default",
  resource: "FaasInstance",
  restPath: "faasinstance",
}

export interface ServerConfig {
  host: string
  insecure: boolean
  authentication: ServerConfigAuthentication
}

export interface ServerConfigAuthentication {
  username: string
  password: string
  token: string
}

export interface InstanceLimitations {
  maxConcurrentExecutions: number
  maxExecutionTime: number
}

export interface AuditData {
  createdBy: string
  updatedBy: string
  createdOn: string | Date
  updatedOn: string | Date
}

export const FaasInstanceResource = {
  "auditData": {
    "createdBy": "2023-11-06T19:22:07Z",
    "updatedBy": "system",
    "createdOn": "2023-11-06T19:22:07Z"
  },
  "name": "FaasInstance",
  "namespace": {
    "name": "default"
  },
  "properties": [
    {
      "name": "id",
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
    {
      "name": "name",
      "type": "STRING",
      "required": true,
      "unique": true,
      "length": 255
    },
    {
      "name": "serverConfig",
      "type": "STRUCT",
      "typeRef": "ServerConfig",
      "required": true
    },
    {
      "name": "limitations",
      "type": "STRUCT",
      "typeRef": "InstanceLimitations"
    },
    {
      "name": "annotations",
      "type": "MAP",
      "item": {
        "name": "",
        "type": "STRING"
      }
    },
    {
      "name": "version",
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
    },
    {
      "name": "auditData",
      "type": "STRUCT",
      "typeRef": "AuditData",
      "exampleValue": {
        "createdBy": "admin",
        "createdOn": "2023-11-06T19:22:06Z",
        "updatedBy": "admin",
        "updatedOn": "2023-11-06T19:22:06Z"
      },
      "title": "Audit Data",
      "description": "The audit data of the resource/record. \nIt contains information about who created the resource/record, when it was created, who last updated the resource/record and when it was last updated.",
      "annotations": {
        "SpecialProperty": "true"
      }
    }
  ],
  "types": [
    {
      "name": "ServerConfig",
      "title": "",
      "description": "",
      "properties": [
        {
          "name": "host",
          "type": "STRING",
          "required": true
        },
        {
          "name": "insecure",
          "type": "BOOL",
          "required": true,
          "defaultValue": false
        },
        {
          "name": "authentication",
          "type": "STRUCT",
          "typeRef": "ServerConfigAuthentication",
          "required": true
        }
      ]
    },
    {
      "name": "ServerConfigAuthentication",
      "title": "",
      "description": "",
      "properties": [
        {
          "name": "username",
          "type": "STRING"
        },
        {
          "name": "password",
          "type": "STRING"
        },
        {
          "name": "token",
          "type": "STRING"
        }
      ]
    },
    {
      "name": "InstanceLimitations",
      "title": "",
      "description": "",
      "properties": [
        {
          "name": "maxConcurrentExecutions",
          "type": "INT32",
          "defaultValue": 2
        },
        {
          "name": "maxExecutionTime",
          "type": "INT32",
          "defaultValue": 1500
        }
      ]
    },
    {
      "name": "AuditData",
      "title": "Audit Data",
      "description": "Audit Data is a type that represents the audit data of a resource/record. ",
      "properties": [
        {
          "name": "createdBy",
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
        {
          "name": "updatedBy",
          "type": "STRING",
          "length": 256,
          "exampleValue": "admin",
          "title": "Updated By",
          "description": "The user who last updated the resource/record.",
          "annotations": {
            "SpecialProperty": "true"
          }
        },
        {
          "name": "createdOn",
          "type": "TIMESTAMP",
          "immutable": true,
          "exampleValue": "2023-11-06T19:22:06Z",
          "title": "Created On",
          "description": "The timestamp when the resource/record was created.",
          "annotations": {
            "SpecialProperty": "true"
          }
        },
        {
          "name": "updatedOn",
          "type": "TIMESTAMP",
          "exampleValue": "2023-11-06T19:22:06Z",
          "title": "Updated On",
          "description": "The timestamp when the resource/record was last updated.",
          "annotations": {
            "SpecialProperty": "true"
          }
        }
      ]
    }
  ],
  "description": "FunctionExecutionEngine",
  "annotations": {
    "EnableAudit": "true",
    "NormalizedResource": "true"
  }
} as unknown

