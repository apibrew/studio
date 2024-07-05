
export interface GrabberSource {
    content?: string
    version: number
    id: string
    name: string
}

export const GrabberSourceEntityInfo = {
    namespace: "default",
    resource: "GrabberSource",
    restPath: "grabber-source",
}

export const GrabberSourceResource = {
  "auditData": {
    "createdBy": ""
  },
  "name": "GrabberSource",
  "namespace": {
    "name": "default"
  },
  "properties": {
    "content": {
      "type": "STRING",
      "length": 20478,
      "annotations": {
        "Order": "2",
        "PropertyEditor": "Nano Code",
        "SourceMatchKey": "5675384a325b"
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
        "Order": "0",
        "SourceMatchKey": "102fab01d4c7",
        "SpecialProperty": "true"
      }
    },
    "name": {
      "type": "STRING",
      "required": true,
      "unique": true,
      "annotations": {
        "Order": "1",
        "SourceMatchKey": "9208df7910d8"
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
        "SourceMatchKey": "327c5198500d",
        "SpecialProperty": "true"
      }
    }
  }
} as unknown

