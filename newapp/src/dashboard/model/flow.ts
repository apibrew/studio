import {FlowControlType} from './flow-control-type';

export interface Flow {
    id: string
    controls: Control[]
    name: string
    version: number
}

export const FlowEntityInfo = {
    namespace: "nano",
    resource: "Flow",
    restPath: "nano-flow",
}

export interface Control {
    stylesOverride: { [key: string]: string }
    id: string
    title: string
    controlType: FlowControlType
    params: { [key: string]: object }
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
        "controlType": {
          "type": "REFERENCE",
          "reference": "nano/FlowControlType",
          "title": "Name",
          "description": "Name"
        },
        "id": {
          "type": "STRING",
          "required": true,
          "title": "ID",
          "description": "ID"
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

