
export interface GithubSso {
    code?: string
    email?: string
    details?: object
    version: number
    id: string
}

export const GithubSsoEntityInfo = {
    namespace: "default",
    resource: "GithubSso",
    restPath: "github-sso",
}

export const GithubSsoResource = {
  "auditData": {
    "createdBy": "admin",
    "updatedBy": "system",
    "createdOn": "2024-01-06T11:15:19Z",
    "updatedOn": "2024-01-06T13:08:01Z"
  },
  "name": "GithubSso",
  "namespace": {
    "name": "default"
  },
  "virtual": true,
  "properties": {
    "code": {
      "type": "STRING"
    },
    "details": {
      "type": "OBJECT"
    },
    "email": {
      "type": "STRING"
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
  "annotations": {
    "AllowPublicGetAccess": "true",
    "NormalizedResource": "true"
  }
} as unknown

