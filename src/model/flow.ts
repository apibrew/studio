import {FlowControlType} from './flow-control-type';

export interface Flow {
    id: string
    name: string
    controls: Control[]
    version: number
}

export const FlowEntityInfo = {
    namespace: "nano",
    resource: "Flow",
    restPath: "nano-flow",
}

export interface Control {
    title: string
    control: FlowControlType
    params: { [key: string]: object }
    stylesOverride: { [key: string]: string }
}

export const FlowResource = {
  "name": "Flow",
  "namespace": {
    "name": "nano"
  },
  "properties": {
    "controls": {
      "type": "LIST",
      "required": true,
      "item": {
        "type": "STRUCT",
        "typeRef": "Control"
      },
      "title": "Controls",
      "description": "Controls"
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
    "name": {
      "type": "STRING",
      "required": true,
      "unique": true,
      "length": 255,
      "title": "Name",
      "description": "Name"
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
      "name": "Control",
      "title": "",
      "description": "",
      "properties": {
        "control": {
          "type": "REFERENCE",
          "reference": "nano/FlowControl",
          "title": "Name",
          "description": "Name"
        },
        "params": {
          "type": "MAP",
          "required": true,
          "item": {
            "type": "OBJECT"
          },
          "title": "Parameters",
          "description": "Parameters"
        },
        "stylesOverride": {
          "type": "MAP",
          "item": {
            "type": "STRING"
          },
          "title": "Styles Override",
          "description": "Styles Override"
        },
        "title": {
          "type": "STRING",
          "title": "Title",
          "description": "Title"
        }
      }
    }
  ]
} as unknown

