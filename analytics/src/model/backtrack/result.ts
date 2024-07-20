import {Simulation} from './simulation';

export interface Result {
    totalWithdraw: number
    id: string
    totalPl: number
    annualReturnRateWithoutMargin: number
    version: number
    simulation: Simulation
    totalDeposit: number
    endDate: string
    endBalance: number
    totalMovement: number
    annualReturnRate: number
    returnRateWithoutMargin: number
    startDate: string
    returnRate: number
}

export const ResultEntityInfo = {
    namespace: "backtrack",
    resource: "Result",
    restPath: "backtrack-result",
}

export const ResultResource = {
  "auditData": {
    "createdBy": "system",
    "updatedBy": "system",
    "createdOn": "2024-07-18T09:27:55Z",
    "updatedOn": "2024-07-18T09:31:08Z"
  },
  "name": "Result",
  "namespace": {
    "name": "backtrack"
  },
  "properties": {
    "annualReturnRate": {
      "type": "FLOAT32",
      "required": true,
      "annotations": {
        "SourceMatchKey": "d935e8a97ca6"
      }
    },
    "annualReturnRateWithoutMargin": {
      "type": "FLOAT32",
      "required": true,
      "annotations": {
        "SourceMatchKey": "710cae62406b"
      }
    },
    "endBalance": {
      "type": "FLOAT32",
      "required": true,
      "annotations": {
        "SourceMatchKey": "a464069cd61f"
      }
    },
    "endDate": {
      "type": "DATE",
      "required": true,
      "annotations": {
        "SourceMatchKey": "7fb0bbfed14f"
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
    "returnRate": {
      "type": "FLOAT32",
      "required": true,
      "annotations": {
        "SourceMatchKey": "f9799b5720e2"
      }
    },
    "returnRateWithoutMargin": {
      "type": "FLOAT32",
      "required": true,
      "annotations": {
        "SourceMatchKey": "70464f35f5e5"
      }
    },
    "simulation": {
      "type": "REFERENCE",
      "required": true,
      "unique": true,
      "reference": "backtrack/Simulation",
      "annotations": {
        "SourceMatchKey": "de1a49b5dfef"
      }
    },
    "startDate": {
      "type": "DATE",
      "required": true,
      "annotations": {
        "SourceMatchKey": "f7bb3c5a9a64"
      }
    },
    "totalDeposit": {
      "type": "FLOAT32",
      "required": true,
      "annotations": {
        "SourceMatchKey": "268c5a4319fe"
      }
    },
    "totalMovement": {
      "type": "FLOAT32",
      "required": true,
      "annotations": {
        "SourceMatchKey": "6bfaea795330"
      }
    },
    "totalPl": {
      "type": "FLOAT32",
      "required": true,
      "annotations": {
        "SourceMatchKey": "d95ba37c81cc"
      }
    },
    "totalWithdraw": {
      "type": "FLOAT32",
      "required": true,
      "annotations": {
        "SourceMatchKey": "6046022a25a0"
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

