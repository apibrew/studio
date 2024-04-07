
export interface Flow {
    id: string
    name: string
    statements: Statement[]
    version: number
}

export const FlowEntityInfo = {
    namespace: "studio",
    resource: "Flow",
    restPath: "studio-flow",
}

export interface EventParams {
    finalizes: boolean
    annotations: { [key: string]: string }
    type: string
    action: Action
    order: Order
    sync: boolean
    responds: boolean
}

export interface ApiSaveParams {
    payload: object
    type: string
}

export interface Statement {
    variable?: string
    kind: Kind
    params: object
}

export enum Action {
    CREATE = "CREATE",
    GET = "GET",
    LOAD = "LOAD",
    UPDATE = "UPDATE",
    DELETE = "DELETE",
    LIST = "LIST",
}

export enum Order {
    BEFORE = "BEFORE",
    AFTER = "AFTER",
}

export enum Kind {
    EVENT = "EVENT",
    API_CREATE = "API_CREATE",
    API_GET = "API_GET",
    API_LOAD = "API_LOAD",
    API_UPDATE = "API_UPDATE",
    API_DELETE = "API_DELETE",
    API_LIST = "API_LIST",
    CODE = "CODE",
    ASSIGN = "ASSIGN",
    CONDITION = "CONDITION",
    HTTP_CALL = "HTTP_CALL",
    FUNCTION_CALL = "FUNCTION_CALL",
    TEMPLATE_CALL = "TEMPLATE_CALL",
    END = "END",
}

export const FlowResource = {
  "name": "Flow",
  "namespace": {
    "name": "studio"
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
        "SpecialProperty": "true"
      }
    },
    "name": {
      "type": "STRING",
      "required": true,
      "unique": true,
      "length": 255,
      "title": "Name",
      "description": "Name"
    },
    "statements": {
      "type": "LIST",
      "required": true,
      "item": {
        "type": "STRUCT",
        "typeRef": "Statement"
      },
      "defaultValue": null
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
      "name": "EventParams",
      "title": "",
      "description": "",
      "properties": {
        "action": {
          "type": "ENUM",
          "enumValues": [
            "CREATE",
            "GET",
            "LOAD",
            "UPDATE",
            "DELETE",
            "LIST"
          ]
        },
        "annotations": {
          "type": "MAP",
          "item": {
            "type": "STRING"
          }
        },
        "finalizes": {
          "type": "BOOL"
        },
        "order": {
          "type": "ENUM",
          "enumValues": [
            "BEFORE",
            "AFTER"
          ]
        },
        "responds": {
          "type": "BOOL"
        },
        "sync": {
          "type": "BOOL"
        },
        "type": {
          "type": "STRING"
        }
      }
    },
    {
      "name": "ApiSaveParams",
      "title": "",
      "description": "",
      "properties": {
        "payload": {
          "type": "OBJECT"
        },
        "type": {
          "type": "STRING"
        }
      }
    },
    {
      "name": "Statement",
      "title": "",
      "description": "",
      "properties": {
        "kind": {
          "type": "ENUM",
          "enumValues": [
            "EVENT",
            "API_CREATE",
            "API_GET",
            "API_LOAD",
            "API_UPDATE",
            "API_DELETE",
            "API_LIST",
            "CODE",
            "ASSIGN",
            "CONDITION",
            "HTTP_CALL",
            "FUNCTION_CALL",
            "TEMPLATE_CALL",
            "END"
          ]
        },
        "params": {
          "type": "OBJECT"
        },
        "variable": {
          "type": "STRING"
        }
      }
    }
  ],
  "annotations": {
    "NormalizedResource": "true"
  }
} as unknown

