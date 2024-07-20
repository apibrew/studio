
export interface Simulation {
    id: string
    name: string
    state: State
    version: number
    marginConfig: MarginConfiguration
}

export const SimulationEntityInfo = {
    namespace: "backtrack",
    resource: "Simulation",
    restPath: "backtrack-simulation",
}

export interface MarginConfiguration {
    margin: number
    maintenanceMargin: number
}

export enum State {
    PENDING = "PENDING",
    PENDING_COMPUTE = "PENDING_COMPUTE",
    COMPUTING = "COMPUTING",
    FINISHED = "FINISHED",
}

export const SimulationResource = {
  "auditData": {
    "createdBy": "system",
    "updatedBy": "system",
    "createdOn": "2024-07-18T09:27:55Z",
    "updatedOn": "2024-07-18T09:31:08Z"
  },
  "name": "Simulation",
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
    "marginConfig": {
      "type": "STRUCT",
      "typeRef": "MarginConfiguration",
      "required": true,
      "annotations": {
        "SourceMatchKey": "6877c90c3288"
      }
    },
    "name": {
      "type": "STRING",
      "required": true,
      "unique": true,
      "annotations": {
        "SourceMatchKey": "3c7448a7bbbe"
      }
    },
    "state": {
      "type": "ENUM",
      "required": true,
      "enumValues": [
        "PENDING",
        "PENDING_COMPUTE",
        "COMPUTING",
        "FINISHED"
      ],
      "annotations": {
        "SourceMatchKey": "7b68f65cd94d"
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
  },
  "types": [
    {
      "name": "MarginConfiguration",
      "title": "",
      "description": "",
      "properties": {
        "maintenanceMargin": {
          "type": "FLOAT32",
          "required": true
        },
        "margin": {
          "type": "FLOAT32",
          "required": true
        }
      }
    }
  ]
} as unknown

