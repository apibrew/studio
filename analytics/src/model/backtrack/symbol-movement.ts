import {Simulation} from './simulation';

export interface SymbolMovement {
    percentageChange: number
    id: string
    marginUsagePercentage: number
    simulation: Simulation
    date: string
    equity: number
    version: number
    count: number
    marginUsage: number
    symbol: string
    marketValue: number
    pl: number
    change: number
    currentPrice: number
    totalPl: number
    previousPrice: number
}

export const SymbolMovementEntityInfo = {
    namespace: "backtrack",
    resource: "SymbolMovement",
    restPath: "backtrack-symbol-movement",
}

export const SymbolMovementResource = {
  "auditData": {
    "createdBy": "system",
    "updatedBy": "system",
    "createdOn": "2024-07-18T09:27:55Z",
    "updatedOn": "2024-07-18T09:31:08Z"
  },
  "name": "SymbolMovement",
  "namespace": {
    "name": "backtrack"
  },
  "properties": {
    "change": {
      "type": "FLOAT32",
      "required": true,
      "annotations": {
        "SourceMatchKey": "106588e54e13"
      }
    },
    "count": {
      "type": "INT32",
      "required": true,
      "annotations": {
        "SourceMatchKey": "ed64f3ddff94"
      }
    },
    "currentPrice": {
      "type": "FLOAT32",
      "required": true,
      "annotations": {
        "SourceMatchKey": "4f93107448a1"
      }
    },
    "date": {
      "type": "DATE",
      "required": true,
      "annotations": {
        "SourceMatchKey": "3e365e27e681"
      }
    },
    "equity": {
      "type": "FLOAT32",
      "required": true,
      "annotations": {
        "SourceMatchKey": "6dab15478ca5"
      }
    },
    "id": {
      "type": "UUID",
      "primary": true,
      "required": true,
      "immutable": true,
      "exampleValue": "a39621a4-6d48-11ee-b962-0242ac120002",
      "annotations": {
        "SourceMatchKey": "54cb3d263539",
        "SpecialProperty": "true"
      }
    },
    "marginUsage": {
      "type": "FLOAT32",
      "required": true,
      "annotations": {
        "SourceMatchKey": "6458b2f904cd"
      }
    },
    "marginUsagePercentage": {
      "type": "FLOAT32",
      "required": true,
      "annotations": {
        "SourceMatchKey": "de463fe9317e"
      }
    },
    "marketValue": {
      "type": "FLOAT32",
      "required": true,
      "annotations": {
        "SourceMatchKey": "ecd93c316beb"
      }
    },
    "percentageChange": {
      "type": "FLOAT32",
      "required": true,
      "annotations": {
        "SourceMatchKey": "75898bab4976"
      }
    },
    "pl": {
      "type": "FLOAT32",
      "required": true,
      "annotations": {
        "SourceMatchKey": "6793261ff715"
      }
    },
    "previousPrice": {
      "type": "FLOAT32",
      "required": true,
      "annotations": {
        "SourceMatchKey": "143fd69a5fe7"
      }
    },
    "simulation": {
      "type": "REFERENCE",
      "required": true,
      "reference": "backtrack/Simulation",
      "annotations": {
        "SourceMatchKey": "e2232c951d98"
      }
    },
    "symbol": {
      "type": "STRING",
      "required": true,
      "annotations": {
        "SourceMatchKey": "9d1f59008267"
      }
    },
    "totalPl": {
      "type": "FLOAT32",
      "required": true,
      "annotations": {
        "SourceMatchKey": "4140f621be2b"
      }
    },
    "version": {
      "type": "INT32",
      "required": true,
      "defaultValue": 1,
      "exampleValue": 1,
      "annotations": {
        "AllowEmptyPrimitive": "true",
        "SourceMatchKey": "f4cc1acac487",
        "SpecialProperty": "true"
      }
    }
  }
} as unknown

