
export interface StockData {
    changeOverTime: number
    vwap: number
    volume: number
    low: number
    changePercent: number
    close: number
    change: number
    adjClose: number
    version: number
    high: number
    date: string
    symbol: string
    id: string
    unadjustedVolume: number
    open: number
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
    "updatedOn": "2024-07-09T18:06:24Z"
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
        "SourceMatchKey": "604ad91d2879"
      }
    },
    "change": {
      "type": "FLOAT64",
      "required": true,
      "annotations": {
        "SourceMatchKey": "efd073f1871c"
      }
    },
    "changeOverTime": {
      "type": "FLOAT64",
      "required": true,
      "annotations": {
        "SourceMatchKey": "72d05ee78844"
      }
    },
    "changePercent": {
      "type": "FLOAT64",
      "required": true,
      "annotations": {
        "SourceMatchKey": "fb82aade0dca"
      }
    },
    "close": {
      "type": "FLOAT64",
      "required": true,
      "annotations": {
        "SourceMatchKey": "804fe99461cc"
      }
    },
    "date": {
      "type": "DATE",
      "required": true,
      "annotations": {
        "SourceMatchKey": "5c2dab8a9fbb"
      }
    },
    "high": {
      "type": "FLOAT64",
      "required": true,
      "annotations": {
        "SourceMatchKey": "9af237906063"
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
    "low": {
      "type": "FLOAT64",
      "required": true,
      "annotations": {
        "SourceMatchKey": "50e047f9bc68"
      }
    },
    "open": {
      "type": "FLOAT64",
      "required": true,
      "annotations": {
        "SourceMatchKey": "b594001eb0dc"
      }
    },
    "symbol": {
      "type": "STRING",
      "required": true,
      "annotations": {
        "SourceMatchKey": "b185efc1546c"
      }
    },
    "unadjustedVolume": {
      "type": "INT64",
      "required": true,
      "annotations": {
        "SourceMatchKey": "3dca3251958e"
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
    },
    "volume": {
      "type": "INT64",
      "required": true,
      "annotations": {
        "SourceMatchKey": "290e5caf530a"
      }
    },
    "vwap": {
      "type": "FLOAT64",
      "required": true,
      "annotations": {
        "SourceMatchKey": "3b2aff451c03"
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

