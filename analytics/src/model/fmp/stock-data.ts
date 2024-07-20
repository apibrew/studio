
export interface StockData {
    id: string
    low: number
    unadjustedVolume: number
    open: number
    close: number
    volume: number
    changePercent: number
    change: number
    changeOverTime: number
    symbol: string
    version: number
    adjClose: number
    vwap: number
    date: string
    high: number
}

export const StockDataEntityInfo = {
    namespace: "fmp",
    resource: "StockData",
    restPath: "fmp-stock-data",
}

export const StockDataResource = {
  "auditData": {
    "createdBy": "system",
    "updatedBy": "system",
    "createdOn": "2024-07-06T21:32:27Z",
    "updatedOn": "2024-07-18T09:31:09Z"
  },
  "name": "StockData",
  "namespace": {
    "name": "fmp"
  },
  "properties": {
    "adjClose": {
      "type": "FLOAT64",
      "required": true,
      "annotations": {
        "SourceMatchKey": "99ddc8678151"
      }
    },
    "change": {
      "type": "FLOAT64",
      "required": true,
      "annotations": {
        "SourceMatchKey": "6f5023a1bb6e"
      }
    },
    "changeOverTime": {
      "type": "FLOAT64",
      "required": true,
      "annotations": {
        "SourceMatchKey": "c62fd9d97141"
      }
    },
    "changePercent": {
      "type": "FLOAT64",
      "required": true,
      "annotations": {
        "SourceMatchKey": "f1104a14d346"
      }
    },
    "close": {
      "type": "FLOAT64",
      "required": true,
      "annotations": {
        "SourceMatchKey": "e85c4464bf2a"
      }
    },
    "date": {
      "type": "DATE",
      "required": true,
      "annotations": {
        "SourceMatchKey": "f622082a0db2"
      }
    },
    "high": {
      "type": "FLOAT64",
      "required": true,
      "annotations": {
        "SourceMatchKey": "459a73927d96"
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
    "low": {
      "type": "FLOAT64",
      "required": true,
      "annotations": {
        "SourceMatchKey": "2e48dcfc201f"
      }
    },
    "open": {
      "type": "FLOAT64",
      "required": true,
      "annotations": {
        "SourceMatchKey": "f73a5ee73962"
      }
    },
    "symbol": {
      "type": "STRING",
      "required": true,
      "annotations": {
        "SourceMatchKey": "02fe8230d928"
      }
    },
    "unadjustedVolume": {
      "type": "INT64",
      "required": true,
      "annotations": {
        "SourceMatchKey": "51c175fa6b7f"
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
    },
    "volume": {
      "type": "INT64",
      "required": true,
      "annotations": {
        "SourceMatchKey": "7f8c0f14deec"
      }
    },
    "vwap": {
      "type": "FLOAT64",
      "required": true,
      "annotations": {
        "SourceMatchKey": "930501d56933"
      }
    }
  },
  "indexes": [
    {
      "properties": [
        {
          "name": "symbol",
          "order": "UNKNOWN"
        },
        {
          "name": "date",
          "order": "UNKNOWN"
        }
      ],
      "unique": true
    }
  ],
  "description": "StockData"
} as unknown

