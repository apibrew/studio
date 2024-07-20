import {Simulation} from './simulation';

export interface Transfer {
    simulation: Simulation
    description: string
    id: string
    date: string
    kind: Kind
    amount: number
    version: number
}

export const TransferEntityInfo = {
    namespace: "backtrack",
    resource: "Transfer",
    restPath: "backtrack-transfer",
}

export enum Kind {
    DEPOSIT = "DEPOSIT",
    WITHDRAW = "WITHDRAW",
}

export const TransferResource = {
  "auditData": {
    "createdBy": "system",
    "updatedBy": "system",
    "createdOn": "2024-07-18T09:27:55Z",
    "updatedOn": "2024-07-18T09:31:08Z"
  },
  "name": "Transfer",
  "namespace": {
    "name": "backtrack"
  },
  "properties": {
    "amount": {
      "type": "INT32",
      "required": true,
      "annotations": {
        "SourceMatchKey": "93b16734aafe"
      }
    },
    "date": {
      "type": "DATE",
      "required": true,
      "annotations": {
        "SourceMatchKey": "7c0ca50e1d82"
      }
    },
    "description": {
      "type": "STRING",
      "required": true,
      "annotations": {
        "SourceMatchKey": "7ff509cce320"
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
    "kind": {
      "type": "ENUM",
      "required": true,
      "enumValues": [
        "DEPOSIT",
        "WITHDRAW"
      ],
      "annotations": {
        "SourceMatchKey": "98daaeea2948"
      }
    },
    "simulation": {
      "type": "REFERENCE",
      "required": true,
      "reference": "backtrack/Simulation",
      "annotations": {
        "SourceMatchKey": "934a7e423576"
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

