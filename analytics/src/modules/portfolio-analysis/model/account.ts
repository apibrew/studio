
export interface Account {
    id: string
    version: number
}

export const AccountEntityInfo = {
    namespace: "portfolio-analysis",
    resource: "Account",
    restPath: "portfolio-analysis-account",
}

export const AccountResource = {
  "auditData": {
    "createdBy": "admin",
    "createdOn": "2024-07-12T08:06:28Z"
  },
  "name": "Account",
  "namespace": {
    "name": "portfolio-analysis"
  },
  "properties": {
    "id": {
      "type": "UUID",
      "primary": true,
      "required": true,
      "immutable": true,
      "exampleValue": "a39621a4-6d48-11ee-b962-0242ac120002",
      "description": "The unique identifier of the resource. It is randomly generated and immutable.",
      "annotations": {
        "SourceMatchKey": "b23ede688b7c",
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
        "SourceMatchKey": "f335feece4b7",
        "SpecialProperty": "true"
      }
    }
  }
} as unknown

