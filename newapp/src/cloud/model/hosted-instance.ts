
export interface HostedInstance {
    secure: boolean
    version: number
    id: string
    host: string
    name: string
    port: number
    owner: string
    token: string
}

export const HostedInstanceEntityInfo = {
    namespace: "default",
    resource: "HostedInstance",
    restPath: "hosted-instance",
}

export const HostedInstanceResource = {
  "auditData": {
    "createdBy": "admin",
    "updatedBy": "admin",
    "createdOn": "2024-10-19T23:21:37Z",
    "updatedOn": "2024-10-20T00:05:02Z"
  },
  "name": "HostedInstance",
  "namespace": {
    "name": "default"
  },
  "properties": {
    "host": {
      "type": "STRING",
      "required": true,
      "annotations": {
        "SourceMatchKey": "d57151321aff"
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
        "SourceMatchKey": "4fd59fda3d8d",
        "SpecialProperty": "true"
      }
    },
    "name": {
      "type": "STRING",
      "required": true,
      "annotations": {
        "SourceMatchKey": "26ecc81a2436"
      }
    },
    "owner": {
      "type": "STRING",
      "required": true,
      "annotations": {
        "SourceMatchKey": "d2bda7b3f71e"
      }
    },
    "port": {
      "type": "INT32",
      "required": true,
      "annotations": {
        "SourceMatchKey": "b6063adf2297"
      }
    },
    "secure": {
      "type": "BOOL",
      "required": true,
      "annotations": {
        "SourceMatchKey": "21fbf5acb3c4"
      }
    },
    "token": {
      "type": "STRING",
      "required": true,
      "annotations": {
        "SourceMatchKey": "0f2db714efe8"
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
        "SourceMatchKey": "6e067729e440",
        "SpecialProperty": "true"
      }
    }
  }
} as unknown

