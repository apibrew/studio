
export interface Flow {
    id: string
    statements: Statement[]
    name: string
    trigger?: object
    version: number
}

export const FlowEntityInfo = {
    namespace: "nano",
    resource: "Flow",
    restPath: "nano-flow",
}

export interface ArgumentType {
    type: string
    name: string
}

export interface FunctionCall {
    name: string
    params: ArgumentType[]
}

export interface WebHookCall {
    params: ArgumentType[]
    name: string
}

export interface Action {
    type: string
}

export interface Event {
    apiAction: ApiAction
    order: Order
    sync: boolean
    responds: boolean
    finalizes: boolean
    annotations: { [key: string]: string }
    type: string
}

export interface ApiSaveParams {
    type: string
    payload: object
}

export interface ApiLoadParams {
    params: object
    type: string
    match: object
}

export interface AssignParams {
    left: string
    expression: string
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

export interface FailParams {
    message: string
}

export interface Statement {
    checkResult: boolean
    kind: Kind
    params: object
    variable: string
}

export enum ApiAction {
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
    API_CREATE = "API_CREATE",
    API_GET = "API_GET",
    API_LOAD = "API_LOAD",
    API_UPDATE = "API_UPDATE",
    API_DELETE = "API_DELETE",
    API_DELETE_ALL = "API_DELETE_ALL",
    API_LIST = "API_LIST",
    API_EXISTS = "API_EXISTS",
    API_AUTHENTICATE = "API_AUTHENTICATE",
    TRANSACTION = "TRANSACTION",
    CODE = "CODE",
    ASSIGN = "ASSIGN",
    CONDITION = "CONDITION",
    HTTP_CALL = "HTTP_CALL",
    FUNCTION_CALL = "FUNCTION_CALL",
    LOOP = "LOOP",
    GROUP = "GROUP",
    FAIL = "FAIL",
}

export const FlowResource = {
  "name": "Flow",
  "namespace": {
    "name": "nano"
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
    "trigger": {
      "type": "OBJECT",
      "length": 255,
      "title": "Trigger",
      "description": "Trigger",
      "annotations": {
        "oneOf": "FunctionCall, WebHookCall, Action, Event"
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
  "types": [
    {
      "name": "ArgumentType",
      "title": "",
      "description": "",
      "properties": {
        "name": {
          "type": "STRING"
        },
        "type": {
          "type": "STRING",
          "annotations": {
            "type": "PropertyType"
          }
        }
      }
    },
    {
      "name": "FunctionCall",
      "title": "",
      "description": "",
      "properties": {
        "name": {
          "type": "STRING"
        },
        "params": {
          "type": "LIST",
          "item": {
            "type": "STRUCT",
            "typeRef": "ArgumentType"
          }
        }
      }
    },
    {
      "name": "WebHookCall",
      "title": "",
      "description": "",
      "properties": {
        "name": {
          "type": "STRING"
        },
        "params": {
          "type": "LIST",
          "item": {
            "type": "STRUCT",
            "typeRef": "ArgumentType"
          }
        }
      }
    },
    {
      "name": "Action",
      "title": "",
      "description": "",
      "properties": {
        "type": {
          "type": "STRING"
        }
      }
    },
    {
      "name": "Event",
      "title": "",
      "description": "",
      "properties": {
        "annotations": {
          "type": "MAP",
          "item": {
            "type": "STRING"
          }
        },
        "apiAction": {
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
            "API_CREATE",
            "API_GET",
            "API_LOAD",
            "API_UPDATE",
            "API_DELETE",
            "API_DELETE_ALL",
            "API_LIST",
            "API_EXISTS",
            "API_AUTHENTICATE",
            "TRANSACTION",
            "CODE",
            "ASSIGN",
            "CONDITION",
            "HTTP_CALL",
            "FUNCTION_CALL",
            "LOOP",
            "GROUP",
            "FAIL"
          ]
        },
        "params": {
          "type": "OBJECT",
          "annotations": {
            "oneOf": "FunctionCall, WebHookCall, Action, Event"
          }
        },
        "variable": {
          "type": "STRING"
        }
      }
    }
  ]
} as unknown

