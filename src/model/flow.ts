
export interface Flow {
    id: string
    statements: Statement[]
    name: string
    version: number
}

export const FlowEntityInfo = {
    namespace: "studio",
    resource: "Flow",
    restPath: "studio-flow",
}

export interface EventParams {
    action: Action
    order: Order
    sync: boolean
    responds: boolean
    finalizes: boolean
    annotations: { [key: string]: string }
    type: string
}

export interface ActionParams {
    type: string
}

export interface ApiSaveParams {
    type: string
    payload: object
}

export interface ApiLoadParams {
    type: string
    match: object
    params: object
}

export interface AssignParams {
    expression: string
    left: string
}

export interface FunctionCallParams {
    name: string
    params: object
}

export interface CodeParams {
    content: string
}

export interface ConditionParams {
    pass: Statement[]
    fail: Statement[]
    condition: string
}

export interface GroupParams {
    name: string
    statements: Statement[]
}

export interface FailParams {
    message: string
}

export interface Statement {
    variable: string
    checkResult: boolean
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
    ACTION = "ACTION",
    EVENT = "EVENT",
    API_CREATE = "API_CREATE",
    API_GET = "API_GET",
    API_LOAD = "API_LOAD",
    API_UPDATE = "API_UPDATE",
    API_DELETE = "API_DELETE",
    API_LIST = "API_LIST",
    CODE = "CODE",
    FAIL = "FAIL",
    ASSIGN = "ASSIGN",
    CONDITION = "CONDITION",
    GROUP = "GROUP",
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
      "name": "ActionParams",
      "title": "",
      "description": "",
      "properties": {
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
      "name": "ApiLoadParams",
      "title": "",
      "description": "",
      "properties": {
        "match": {
          "type": "OBJECT"
        },
        "params": {
          "type": "OBJECT"
        },
        "type": {
          "type": "STRING"
        }
      }
    },
    {
      "name": "AssignParams",
      "title": "",
      "description": "",
      "properties": {
        "expression": {
          "type": "STRING"
        },
        "left": {
          "type": "STRING"
        }
      }
    },
    {
      "name": "FunctionCallParams",
      "title": "",
      "description": "",
      "properties": {
        "name": {
          "type": "STRING"
        },
        "params": {
          "type": "OBJECT"
        }
      }
    },
    {
      "name": "CodeParams",
      "title": "",
      "description": "",
      "properties": {
        "content": {
          "type": "STRING"
        }
      }
    },
    {
      "name": "ConditionParams",
      "title": "",
      "description": "",
      "properties": {
        "condition": {
          "type": "STRING"
        },
        "fail": {
          "type": "LIST",
          "required": true,
          "item": {
            "type": "STRUCT",
            "typeRef": "Statement"
          },
          "defaultValue": null
        },
        "pass": {
          "type": "LIST",
          "required": true,
          "item": {
            "type": "STRUCT",
            "typeRef": "Statement"
          },
          "defaultValue": null
        }
      }
    },
    {
      "name": "GroupParams",
      "title": "",
      "description": "",
      "properties": {
        "name": {
          "type": "STRING"
        },
        "statements": {
          "type": "LIST",
          "required": true,
          "item": {
            "type": "STRUCT",
            "typeRef": "Statement"
          },
          "defaultValue": null
        }
      }
    },
    {
      "name": "FailParams",
      "title": "",
      "description": "",
      "properties": {
        "message": {
          "type": "STRING"
        }
      }
    },
    {
      "name": "Statement",
      "title": "",
      "description": "",
      "properties": {
        "checkResult": {
          "type": "BOOL"
        },
        "kind": {
          "type": "ENUM",
          "enumValues": [
            "ACTION",
            "EVENT",
            "API_CREATE",
            "API_GET",
            "API_LOAD",
            "API_UPDATE",
            "API_DELETE",
            "API_LIST",
            "CODE",
            "FAIL",
            "ASSIGN",
            "CONDITION",
            "GROUP",
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

