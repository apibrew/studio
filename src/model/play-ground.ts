
export interface PlayGround {
    id: string
    name: string
    loggingLevel: LoggingLevel
    state: State
    language: Language
    run: boolean
    version: number
}

export const PlayGroundEntityInfo = {
    namespace: "studio",
    resource: "PlayGround",
    restPath: "studio-play-ground",
}

export enum LoggingLevel {
    TRACE = "TRACE",
    DEBUG = "DEBUG",
    INFO = "INFO",
    WARN = "WARN",
    ERROR = "ERROR",
    FATAL = "FATAL",
}

export enum State {
    NOT_STARTED = "NOT_STARTED",
    RUNNING = "RUNNING",
    CRASHED = "CRASHED",
    STOPPED = "STOPPED",
}

export enum Language {
    JAVASCRIPT = "JAVASCRIPT",
}

export const PlayGroundResource = {
  "name": "PlayGround",
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
    "language": {
      "type": "ENUM",
      "required": true,
      "defaultValue": "JAVASCRIPT",
      "enumValues": [
        "JAVASCRIPT"
      ],
      "title": "Language",
      "description": "Code language"
    },
    "loggingLevel": {
      "type": "ENUM",
      "required": true,
      "defaultValue": "DEBUG",
      "enumValues": [
        "TRACE",
        "DEBUG",
        "INFO",
        "WARN",
        "ERROR",
        "FATAL"
      ],
      "title": "Logging Level",
      "description": "Logging level"
    },
    "name": {
      "type": "STRING",
      "required": true,
      "unique": true,
      "title": "Name",
      "description": "Full Qualified Name of the playground, it must be unique in the system"
    },
    "run": {
      "type": "BOOL",
      "required": true,
      "defaultValue": false,
      "title": "Start",
      "description": "Run the playground"
    },
    "state": {
      "type": "ENUM",
      "required": true,
      "defaultValue": "NOT_STARTED",
      "enumValues": [
        "NOT_STARTED",
        "RUNNING",
        "CRASHED",
        "STOPPED"
      ],
      "title": "State",
      "description": "Playground state"
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
  "title": "PlayGround",
  "description": "Nano playground for executing scripts",
  "annotations": {
    "NormalizedResource": "true"
  }
} as unknown

