import {Simulation} from './simulation';

export interface Event {
    simulation: Simulation
    id: string
    version: number
}

export const EventEntityInfo = {
    namespace: "backtrack",
    resource: "Event",
    restPath: "backtrack-event",
}

export const EventResource = {
  "auditData": {
    "createdBy": "system",
    "updatedBy": "system",
    "createdOn": "2024-07-18T09:27:55Z",
    "updatedOn": "2024-07-18T09:31:08Z"
  },
  "name": "Event",
  "namespace": {
    "name": "backtrack"
  },
  "properties": {
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
    "simulation": {
      "type": "REFERENCE",
      "required": true,
      "reference": "backtrack/Simulation",
      "annotations": {
        "SourceMatchKey": "d9fbe527a173"
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

