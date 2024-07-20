
export interface StockMark {
    symbol: string
    version: number
    id: string
    mark: string
}

export const StockMarkEntityInfo = {
    namespace: "fmp",
    resource: "StockMark",
    restPath: "fmp-stock-mark",
}

export const StockMarkResource = {
  "auditData": {
    "createdBy": "system",
    "updatedBy": "system",
    "createdOn": "2024-07-16T08:42:49Z",
    "updatedOn": "2024-07-18T09:31:09Z"
  },
  "name": "StockMark",
  "namespace": {
    "name": "fmp"
  },
  "properties": {
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
    "mark": {
      "type": "STRING",
      "required": true,
      "annotations": {
        "SourceMatchKey": "97f6ae709ad6"
      }
    },
    "symbol": {
      "type": "STRING",
      "required": true,
      "unique": true,
      "annotations": {
        "SourceMatchKey": "16863c004399"
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
  "description": "Stock Mark"
} as unknown

