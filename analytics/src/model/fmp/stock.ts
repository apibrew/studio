
export interface Stock {
    exchangeShortName?: string
    id: string
    kind: string
    name: string
    price: number
    symbol: string
    version: number
    exchange: string
}

export const StockEntityInfo = {
    namespace: "fmp",
    resource: "Stock",
    restPath: "fmp-stock",
}

export const StockResource = {
  "auditData": {
    "createdBy": "system",
    "updatedBy": "system",
    "createdOn": "2024-07-06T14:48:12Z",
    "updatedOn": "2024-07-09T18:06:24Z"
  },
  "name": "Stock",
  "namespace": {
    "name": "fmp"
  },
  "properties": {
    "exchange": {
      "type": "STRING",
      "required": true,
      "annotations": {
        "SourceMatchKey": "95c4d235edaa"
      }
    },
    "exchangeShortName": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "92a40d97c3e2"
      }
    },
    "id": {
      "type": "UUID",
      "primary": true,
      "required": true,
      "immutable": true,
      "exampleValue": "a39621a4-6d48-11ee-b962-0242ac120002",
      "annotations": {
        "SourceMatchKey": "e197b65b1e18",
        "SpecialProperty": "true"
      }
    },
    "kind": {
      "type": "STRING",
      "required": true,
      "annotations": {
        "SourceMatchKey": "39d2e2e56601"
      }
    },
    "name": {
      "type": "STRING",
      "required": true,
      "annotations": {
        "SourceMatchKey": "540e595fe4dc"
      }
    },
    "price": {
      "type": "FLOAT64",
      "required": true,
      "annotations": {
        "SourceMatchKey": "e4ba648690da"
      }
    },
    "symbol": {
      "type": "STRING",
      "required": true,
      "unique": true,
      "annotations": {
        "SourceMatchKey": "8699012370f3"
      }
    },
    "version": {
      "type": "INT32",
      "required": true,
      "defaultValue": 1,
      "exampleValue": 1,
      "annotations": {
        "AllowEmptyPrimitive": "true",
        "SourceMatchKey": "4c76b7e4d56a",
        "SpecialProperty": "true"
      }
    }
  },
  "description": "Stock"
} as unknown

