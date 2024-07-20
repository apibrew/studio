
export interface Stock {
    version: number
    exchange: string
    exchangeShortName?: string
    id: string
    kind: string
    name: string
    price: number
    symbol: string
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
    "updatedOn": "2024-07-18T09:31:08Z"
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
        "SourceMatchKey": "aead290e2aaf"
      }
    },
    "exchangeShortName": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "ee687b61ddfb"
      }
    },
    "id": {
      "type": "UUID",
      "primary": true,
      "required": true,
      "immutable": true,
      "exampleValue": "a39621a4-6d48-11ee-b962-0242ac120002",
      "annotations": {
        "SourceMatchKey": "bc511e62f73e",
        "SpecialProperty": "true"
      }
    },
    "kind": {
      "type": "STRING",
      "required": true,
      "annotations": {
        "SourceMatchKey": "f441414736a2"
      }
    },
    "name": {
      "type": "STRING",
      "required": true,
      "annotations": {
        "SourceMatchKey": "10f6331dd7ce"
      }
    },
    "price": {
      "type": "FLOAT64",
      "required": true,
      "annotations": {
        "SourceMatchKey": "bd448afdcebd"
      }
    },
    "symbol": {
      "type": "STRING",
      "required": true,
      "unique": true,
      "annotations": {
        "SourceMatchKey": "afcec5293fd1"
      }
    },
    "version": {
      "type": "INT32",
      "required": true,
      "defaultValue": 1,
      "exampleValue": 1,
      "annotations": {
        "AllowEmptyPrimitive": "true",
        "SourceMatchKey": "0ac3d91c97a6",
        "SpecialProperty": "true"
      }
    }
  },
  "description": "Stock"
} as unknown

