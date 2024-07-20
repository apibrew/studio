
export interface EtfHolder {
    name: string
    version: number
    isin?: string
    weightPercentage: number
    cusip?: string
    sharesNumber: number
    id: string
    etf: string
    asset: string
    marketValue: number
}

export const EtfHolderEntityInfo = {
    namespace: "fmp",
    resource: "EtfHolder",
    restPath: "fmp-etf-holder",
}

export const EtfHolderResource = {
  "auditData": {
    "createdBy": "system",
    "updatedBy": "system",
    "createdOn": "2024-07-16T09:38:36Z",
    "updatedOn": "2024-07-18T09:31:09Z"
  },
  "name": "EtfHolder",
  "namespace": {
    "name": "fmp"
  },
  "properties": {
    "asset": {
      "type": "STRING",
      "required": true,
      "annotations": {
        "SourceMatchKey": "8f6dea99f1e8"
      }
    },
    "cusip": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "a2da22e2ef39"
      }
    },
    "etf": {
      "type": "STRING",
      "required": true,
      "annotations": {
        "SourceMatchKey": "2c198335f8e7"
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
    "isin": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "9fabd0dc4dc1"
      }
    },
    "marketValue": {
      "type": "FLOAT64",
      "required": true,
      "annotations": {
        "SourceMatchKey": "b5e04d555318"
      }
    },
    "name": {
      "type": "STRING",
      "required": true,
      "annotations": {
        "SourceMatchKey": "4e581630ea46"
      }
    },
    "sharesNumber": {
      "type": "INT64",
      "required": true,
      "annotations": {
        "SourceMatchKey": "4987e58ae34c"
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
    "weightPercentage": {
      "type": "FLOAT64",
      "required": true,
      "annotations": {
        "SourceMatchKey": "d67c5dfea9ae"
      }
    }
  },
  "indexes": [
    {
      "properties": [
        {
          "name": "etf",
          "order": "UNKNOWN"
        },
        {
          "name": "asset",
          "order": "UNKNOWN"
        }
      ],
      "unique": true
    }
  ],
  "description": "Etf Holder"
} as unknown

