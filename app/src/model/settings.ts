
export interface Settings {
    id: string
    name: string
    repository: Repository
    params?: object
    installed: boolean
    version: number
    auditData?: AuditData
}

export const SettingsEntityInfo = {
    namespace: "studio",
    resource: "Settings",
    restPath: "studio-settings",
}

export interface Repository {
    provider: Provider
    owner: string
    repo: string
}

export interface AuditData {
    createdBy: string
    updatedBy: string
    createdOn: string | Date
    updatedOn: string | Date
}

export enum Provider {
    GITHUB = "GITHUB",
}

export const SettingsResource = {
  "name": "Settings",
  "namespace": {
    "name": "studio"
  },
  "properties": {
    "auditData": {
      "type": "STRUCT",
      "typeRef": "AuditData",
      "exampleValue": {
        "createdBy": "admin",
        "createdOn": "2024-05-01T19:28:21+04:00",
        "updatedBy": "admin",
        "updatedOn": "2024-05-01T19:28:21+04:00"
      },
      "title": "Audit Data",
      "description": "The audit data of the resource/record. \nIt contains information about who created the resource/record, when it was created, who last updated the resource/record and when it was last updated.",
      "annotations": {
        "SpecialProperty": "true"
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
        "SpecialProperty": "true"
      }
    },
    "installed": {
      "type": "BOOL",
      "required": true,
      "defaultValue": false,
      "title": "Installed",
      "description": "Installed"
    },
    "name": {
      "type": "STRING",
      "required": true,
      "unique": true,
      "length": 255,
      "title": "Name",
      "description": "Name"
    },
    "params": {
      "type": "OBJECT",
      "title": "Params",
      "description": "Params"
    },
    "repository": {
      "type": "STRUCT",
      "typeRef": "Repository",
      "required": true,
      "title": "Repository",
      "description": "Repository"
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
      "name": "Repository",
      "title": "",
      "description": "",
      "properties": {
        "owner": {
          "type": "STRING",
          "required": true
        },
        "provider": {
          "type": "ENUM",
          "required": true,
          "defaultValue": "GITHUB",
          "enumValues": [
            "GITHUB"
          ]
        },
        "repo": {
          "type": "STRING",
          "required": true
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
          "exampleValue": "2024-05-01T19:28:21+04:00",
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
          "exampleValue": "2024-05-01T19:28:21+04:00",
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

