
export interface Identifier {
    create_time?: string | Date
    entity_def_id?: string
    rank?: number
    version: number
    permalink?: string
    updated?: boolean
    image_id?: string
    id: string
    uuid: string
    fetch_time?: string | Date
    value?: string
}

export const IdentifierEntityInfo = {
    namespace: "default",
    resource: "Identifier",
    restPath: "identifier",
}

export const IdentifierResource = {
  "auditData": {
    "createdBy": ""
  },
  "name": "Identifier",
  "namespace": {
    "name": "default"
  },
  "properties": {
    "create_time": {
      "type": "TIMESTAMP",
      "annotations": {
        "SourceMatchKey": "31749a7fce50"
      }
    },
    "entity_def_id": {
      "type": "STRING",
      "length": 255,
      "description": "Identifier of the entity definition",
      "annotations": {
        "SourceMatchKey": "33db14b19df9"
      }
    },
    "fetch_time": {
      "type": "TIMESTAMP",
      "annotations": {
        "SourceMatchKey": "9a72ca52f1dc"
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
        "SourceMatchKey": "102fab01d4c7",
        "SpecialProperty": "true"
      }
    },
    "image_id": {
      "type": "STRING",
      "length": 255,
      "description": "Identifier of the image",
      "annotations": {
        "SourceMatchKey": "374798861aeb"
      }
    },
    "permalink": {
      "type": "STRING",
      "length": 2048,
      "description": "Identifier of the object",
      "annotations": {
        "SourceMatchKey": "cc3953118aaa"
      }
    },
    "rank": {
      "type": "INT64",
      "description": "Identifier rank",
      "annotations": {
        "SourceMatchKey": "421409c99079"
      }
    },
    "updated": {
      "type": "BOOL",
      "description": "Identifier updated date",
      "annotations": {
        "SourceMatchKey": "c27bcb60f821"
      }
    },
    "uuid": {
      "type": "UUID",
      "required": true,
      "annotations": {
        "SourceMatchKey": "72c7d76bb847"
      }
    },
    "value": {
      "type": "STRING",
      "length": 255,
      "description": "Identifier value",
      "annotations": {
        "SourceMatchKey": "8f142093e2f8"
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
  },
  "description": "Identifier schema"
} as unknown

