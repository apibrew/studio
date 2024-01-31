import {PlayGround} from './play-ground';

export interface Script {
    id: string
    content: string
    order: number
    annotations?: { [key: string]: string }
    error?: object
    state: State
    output?: object
    contentFormat: ContentFormat
    run: boolean
    playground: PlayGround
    version: number
}

export const ScriptEntityInfo = {
    namespace: "studio",
    resource: "Script",
    restPath: "studio-script",
}

export enum State {
    NOT_STARTED = "NOT_STARTED",
    RUNNING = "RUNNING",
    FINISHED = "FINISHED",
    FAILED = "FAILED",
}

export enum ContentFormat {
    TEXT = "TEXT",
    TAR = "TAR",
    TAR_GZ = "TAR_GZ",
}

export const ScriptResource = {
  "name": "Script",
  "namespace": {
    "name": "studio"
  },
  "properties": {
    "annotations": {
      "type": "MAP",
      "item": {
        "type": "STRING"
      }
    },
    "content": {
      "type": "STRING",
      "required": true,
      "length": 64000,
      "title": "Content",
      "description": "Code content",
      "annotations": {
        "SQLType": "TEXT"
      }
    },
    "contentFormat": {
      "type": "ENUM",
      "required": true,
      "defaultValue": "TEXT",
      "enumValues": [
        "TEXT",
        "TAR",
        "TAR_GZ"
      ],
      "title": "Content Format",
      "description": "Code content format"
    },
    "error": {
      "type": "OBJECT",
      "title": "Output of script execution",
      "description": "Run the script"
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
    "order": {
      "type": "INT32",
      "required": true,
      "defaultValue": 0,
      "title": "Order",
      "description": "Script order"
    },
    "output": {
      "type": "OBJECT",
      "title": "Output of script execution",
      "description": "Run the script"
    },
    "playground": {
      "type": "REFERENCE",
      "required": true,
      "reference": "studio/PlayGround",
      "title": "Playground",
      "description": "Playground"
    },
    "run": {
      "type": "BOOL",
      "required": true,
      "defaultValue": false,
      "title": "Start",
      "description": "Run the script"
    },
    "state": {
      "type": "ENUM",
      "required": true,
      "defaultValue": "NOT_STARTED",
      "enumValues": [
        "NOT_STARTED",
        "RUNNING",
        "FINISHED",
        "FAILED"
      ],
      "title": "State",
      "description": "Script state"
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
  "indexes": [
    {
      "properties": [
        {
          "name": "playground",
          "order": "ASC"
        },
        {
          "name": "order",
          "order": "ASC"
        }
      ],
      "unique": true
    }
  ],
  "title": "Script",
  "description": "Nano script",
  "annotations": {
    "NormalizedResource": "true"
  }
} as unknown

