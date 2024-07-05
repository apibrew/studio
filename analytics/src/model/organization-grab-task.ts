import {Identifier} from './identifier';

export interface OrganizationGrabTask {
    id: string
    status: Status
    version: number
    identifier: Identifier
}

export const OrganizationGrabTaskEntityInfo = {
    namespace: "default",
    resource: "OrganizationGrabTask",
    restPath: "organization-grab-task",
}

export enum Status {
    PENDING = "PENDING",
    EXECUTING = "EXECUTING",
    DONE = "DONE",
    FAILED = "FAILED",
}

export const OrganizationGrabTaskResource = {
  "auditData": {
    "createdBy": ""
  },
  "name": "OrganizationGrabTask",
  "namespace": {
    "name": "default"
  },
  "properties": {
    "id": {
      "type": "UUID",
      "primary": true,
      "required": true,
      "immutable": true,
      "exampleValue": "a39621a4-6d48-11ee-b962-0242ac120002",
      "description": "The unique identifier of the resource. It is randomly generated and immutable.",
      "annotations": {
        "SourceMatchKey": "102fab01d4c7",
        "SpecialProperty": "true"
      }
    },
    "identifier": {
      "type": "REFERENCE",
      "required": true,
      "unique": true,
      "reference": "default/Identifier",
      "annotations": {
        "SourceMatchKey": "d1c4cb5f4e6e"
      }
    },
    "status": {
      "type": "ENUM",
      "required": true,
      "defaultValue": "PENDING",
      "enumValues": [
        "PENDING",
        "EXECUTING",
        "DONE",
        "FAILED"
      ],
      "annotations": {
        "SourceMatchKey": "23d4d82ec15a"
      }
    },
    "version": {
      "type": "INT32",
      "required": true,
      "defaultValue": 1,
      "exampleValue": 1,
      "title": "Version",
      "description": "The version of the resource/record. It is incremented on every update.",
      "annotations": {
        "AllowEmptyPrimitive": "true",
        "SourceMatchKey": "327c5198500d",
        "SpecialProperty": "true"
      }
    }
  }
} as unknown

