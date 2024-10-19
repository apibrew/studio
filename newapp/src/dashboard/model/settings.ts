
export interface Settings {
    customPages?: CustomPage[]
    id: string
    name: string
    version: number
}

export const SettingsEntityInfo = {
    namespace: "studio",
    resource: "Settings",
    restPath: "studio-settings",
}

export interface CustomPage {
    route: string
    location: string
    showInMenu: boolean
    name: string
}

export const SettingsResource = {
  "auditData": {
    "createdBy": "controller",
    "updatedBy": "controller",
    "createdOn": "2024-10-08T12:15:58Z",
    "updatedOn": "2024-10-19T18:31:11Z"
  },
  "name": "Settings",
  "namespace": {
    "name": "studio"
  },
  "properties": {
    "customPages": {
      "type": "LIST",
      "item": {
        "type": "STRUCT",
        "typeRef": "CustomPage"
      },
      "annotations": {
        "SourceMatchKey": "a58625f4a4b4"
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
        "SourceMatchKey": "920c7a0fcbc6",
        "SpecialProperty": "true"
      }
    },
    "name": {
      "type": "STRING",
      "required": true,
      "unique": true,
      "length": 255,
      "title": "Name",
      "description": "Name",
      "annotations": {
        "SourceMatchKey": "9e11c371e5fa"
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
        "SourceMatchKey": "b1aaf7de5ead",
        "SpecialProperty": "true"
      }
    }
  },
  "types": [
    {
      "name": "CustomPage",
      "title": "",
      "description": "",
      "properties": {
        "location": {
          "type": "STRING",
          "required": true
        },
        "name": {
          "type": "STRING",
          "required": true
        },
        "route": {
          "type": "STRING",
          "required": true
        },
        "showInMenu": {
          "type": "BOOL",
          "required": true,
          "defaultValue": true
        }
      }
    }
  ],
  "annotations": {
    "NormalizedResource": "true"
  }
} as unknown

