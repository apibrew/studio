import {Simulation} from './simulation';

export interface Order {
    simulation: Simulation
    id: string
    date: string
    price: number
    symbol: string
    version: number
    quantity: number
}

export const OrderEntityInfo = {
    namespace: "backtrack",
    resource: "Order",
    restPath: "backtrack-order",
}

export const OrderResource = {
  "auditData": {
    "createdBy": "system",
    "updatedBy": "system",
    "createdOn": "2024-07-18T09:27:55Z",
    "updatedOn": "2024-07-18T09:31:08Z"
  },
  "name": "Order",
  "namespace": {
    "name": "backtrack"
  },
  "properties": {
    "date": {
      "type": "DATE",
      "required": true,
      "annotations": {
        "SourceMatchKey": "e23e0eb30728"
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
    "price": {
      "type": "FLOAT32",
      "required": true,
      "annotations": {
        "SourceMatchKey": "5b4d94597995"
      }
    },
    "quantity": {
      "type": "INT32",
      "required": true,
      "annotations": {
        "SourceMatchKey": "f3192e523cdb"
      }
    },
    "simulation": {
      "type": "REFERENCE",
      "required": true,
      "reference": "backtrack/Simulation",
      "annotations": {
        "SourceMatchKey": "7169083283a4"
      }
    },
    "symbol": {
      "type": "STRING",
      "required": true,
      "annotations": {
        "SourceMatchKey": "738905649f28"
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

