
export interface File {
    version: number
    uploadUrl: string
    downloadUrl: string
    id: string
    name: string
}

export const FileEntityInfo = {
    namespace: "storage",
    resource: "File",
    restPath: "storage-file",
}

export const FileResource = {
  "auditData": {
    "createdBy": "system",
    "updatedBy": "system",
    "createdOn": "2024-05-01T18:30:37Z",
    "updatedOn": "2024-05-06T18:52:55Z"
  },
  "name": "File",
  "namespace": {
    "name": "storage"
  },
  "properties": {
    "downloadUrl": {
      "type": "STRING",
      "required": true,
      "length": 1024
    },
    "id": {
      "type": "UUID",
      "primary": true,
      "required": true,
      "immutable": true,
      "exampleValue": "a39621a4-6d48-11ee-b962-0242ac120002",
      "annotations": {
        "SpecialProperty": "true"
      }
    },
    "name": {
      "type": "STRING",
      "required": true
    },
    "uploadUrl": {
      "type": "STRING",
      "required": true,
      "length": 1024
    },
    "version": {
      "type": "INT32",
      "required": true,
      "defaultValue": 1,
      "exampleValue": 1,
      "annotations": {
        "AllowEmptyPrimitive": "true",
        "SpecialProperty": "true"
      }
    }
  }
} as unknown

