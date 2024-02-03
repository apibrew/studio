import {FaasInstance} from './faas-instance';

export interface Config {
  id: string
  instances?: FaasInstance[]
  controller?: ServerConfig
  version: number
}

export const ConfigEntityInfo = {
  namespace: "default",
  resource: "Config",
  restPath: "config",
}

export interface ServerConfig {
  host: string
  insecure: boolean
  authentication: ServerConfigAuthentication
}

export interface ServerConfigAuthentication {
  username: string
  password: string
  token: string
}

export const ConfigResource = {
  "name": "Config",
  "namespace": {
    "name": "default"
  },
  "properties": [
    {
      "name": "id",
      "type": "UUID",
      "required": true,
      "immutable": true,
      "annotations": {
        "PrimaryProperty": "true",
        "SpecialProperty": "true"
      }
    },
    {
      "name": "instances",
      "type": "LIST",
      "item": {
        "name": "",
        "type": "REFERENCE",
        "required": true,
        "reference": {
          "resource": {
            "name": "FaasInstance",
            "namespace": {
              "name": "default"
            }
          },
          "cascade": false
        }
      }
    },
    {
      "name": "controller",
      "type": "STRUCT",
      "typeRef": "ServerConfig"
    },
    {
      "name": "version",
      "type": "INT32",
      "required": true,
      "defaultValue": 1,
      "annotations": {
        "AllowEmptyPrimitive": "true",
        "SpecialProperty": "true"
      }
    }
  ],
  "types": [
    {
      "name": "ServerConfig",
      "title": "",
      "description": "",
      "properties": [
        {
          "name": "host",
          "type": "STRING",
          "required": true
        },
        {
          "name": "insecure",
          "type": "BOOL",
          "required": true,
          "defaultValue": false
        },
        {
          "name": "authentication",
          "type": "STRUCT",
          "typeRef": "ServerConfigAuthentication",
          "required": true
        }
      ]
    },
    {
      "name": "ServerConfigAuthentication",
      "title": "",
      "description": "",
      "properties": [
        {
          "name": "username",
          "type": "STRING"
        },
        {
          "name": "password",
          "type": "STRING"
        },
        {
          "name": "token",
          "type": "STRING"
        }
      ]
    }
  ],
  "annotations": {
    "NormalizedResource": "true"
  }
} as unknown

