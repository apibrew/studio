
export interface Portfolio {
    id: string
    name: string
    items?: PortfolioItem[]
    version: number
}

export const PortfolioEntityInfo = {
    namespace: "portfolio-analysis",
    resource: "Portfolio",
    restPath: "portfolio-analysis-portfolio",
}

export interface PortfolioItem {
    symbol: string
    count: number
}

export const PortfolioResource = {
  "auditData": {
    "createdBy": "admin",
    "updatedBy": "admin",
    "createdOn": "2024-07-12T08:00:26Z",
    "updatedOn": "2024-07-12T08:15:57Z"
  },
  "name": "Portfolio",
  "namespace": {
    "name": "portfolio-analysis"
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
        "SourceMatchKey": "b23ede688b7c",
        "SpecialProperty": "true"
      }
    },
    "items": {
      "type": "LIST",
      "item": {
        "type": "STRUCT",
        "typeRef": "PortfolioItem"
      },
      "annotations": {
        "SourceMatchKey": "bf6ed15a8c5f"
      }
    },
    "name": {
      "type": "STRING",
      "required": true,
      "annotations": {
        "SourceMatchKey": "a214819bf335"
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
        "SourceMatchKey": "f335feece4b7",
        "SpecialProperty": "true"
      }
    }
  },
  "types": [
    {
      "name": "PortfolioItem",
      "title": "",
      "description": "",
      "properties": {
        "count": {
          "type": "INT32",
          "required": true
        },
        "symbol": {
          "type": "STRING",
          "required": true
        }
      }
    }
  ]
} as unknown

