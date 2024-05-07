
export interface FlowControl {
    id: string
    code: string
    name: string
    description?: string
    kind: Kind
    shape?: Shape
    parameters: Parameter[]
    hasReturn?: boolean
    version: number
}

export const FlowControlEntityInfo = {
    namespace: "nano",
    resource: "FlowControl",
    restPath: "nano-flow-control",
}

export interface Parameter {
    name: string
    required: boolean
    description: string
    paramKind: ParamKind
    enumValues: string[]
}

export interface Shape {
    styles: { [key: string]: string }
    format: Format
    content: string
}

export enum Kind {
    ENTRY_POINT = "ENTRY_POINT",
    EXIT_POINT = "EXIT_POINT",
    STATEMENT = "STATEMENT",
    EXPRESSION = "EXPRESSION",
}

export enum ParamKind {
    INPUT = "INPUT",
    BLOCK = "BLOCK",
    RESOURCE = "RESOURCE",
    PROPERTY = "PROPERTY",
    ENUM = "ENUM",
    BOOLEAN = "BOOLEAN",
}

export enum Format {
    JSX = "JSX",
    SVG = "SVG",
}

export const FlowControlResource = {
  "name": "FlowControl",
  "namespace": {
    "name": "nano"
  },
  "properties": {
    "code": {
      "type": "STRING",
      "required": true,
      "length": 10000,
      "title": "Code",
      "description": "Code"
    },
    "description": {
      "type": "STRING",
      "length": 255,
      "title": "Description",
      "description": "Description"
    },
    "hasReturn": {
      "type": "BOOL",
      "title": "Has Return",
      "description": "Has Return"
    },
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
    "kind": {
      "type": "ENUM",
      "required": true,
      "enumValues": [
        "ENTRY_POINT",
        "EXIT_POINT",
        "STATEMENT",
        "EXPRESSION"
      ],
      "title": "Kind",
      "description": "Kind"
    },
    "name": {
      "type": "STRING",
      "required": true,
      "unique": true,
      "length": 255,
      "title": "Name",
      "description": "Name"
    },
    "parameters": {
      "type": "LIST",
      "required": true,
      "item": {
        "type": "STRUCT",
        "typeRef": "Parameter"
      },
      "title": "Parameters",
      "description": "Parameters"
    },
    "shape": {
      "type": "STRUCT",
      "typeRef": "Shape",
      "title": "Shape",
      "description": "Shape"
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
      "name": "Parameter",
      "title": "",
      "description": "",
      "properties": {
        "description": {
          "type": "STRING",
          "length": 255,
          "title": "Description",
          "description": "Description"
        },
        "enumValues": {
          "type": "LIST",
          "item": {
            "type": "STRING"
          },
          "title": "Enum Values",
          "description": "Enum Values"
        },
        "name": {
          "type": "STRING",
          "required": true,
          "length": 255,
          "title": "Name",
          "description": "Name"
        },
        "paramKind": {
          "type": "ENUM",
          "required": true,
          "enumValues": [
            "INPUT",
            "BLOCK",
            "RESOURCE",
            "PROPERTY",
            "ENUM",
            "BOOLEAN"
          ],
          "title": "Param Kind",
          "description": "Param Kind"
        },
        "required": {
          "type": "BOOL",
          "required": true,
          "title": "Required",
          "description": "Required"
        }
      }
    },
    {
      "name": "Shape",
      "title": "",
      "description": "",
      "properties": {
        "content": {
          "type": "STRING",
          "title": "Content",
          "description": "Content"
        },
        "format": {
          "type": "ENUM",
          "required": true,
          "enumValues": [
            "JSX",
            "SVG"
          ],
          "title": "Format",
          "description": "Format"
        },
        "styles": {
          "type": "MAP",
          "item": {
            "type": "STRING"
          },
          "title": "Styles",
          "description": "Styles"
        }
      }
    }
  ]
} as unknown

