import {Database} from './database';

export interface Instance {
    namespace: string
    description?: string
    id: string
    name: string
    version: number
    deploymentStatus: DeploymentStatus
    paidPlanUntil?: string
    backendVersion: string
    title?: string
    database: Database
    adminPassword?: string
    disableBuiltinNanoEngine?: boolean
    cluster: string
    additionalConfig?: any
    modules?: any
    controllerAccessToken?: string
    auditData?: AuditData
    branch: string
    health: Health
    replicaCount: number
    owner?: string
    domain?: string
}

export const InstanceEntityInfo = {
    namespace: "default",
    resource: "Instance",
    restPath: "instance",
}

export interface AuditData {
    createdBy: string
    createdOn: string
    updatedBy: string
    updatedOn: string
}

export enum DeploymentStatus {
    PENDING = "PENDING",
    PENDING_DEPLOY = "PENDING_DEPLOY",
    DEPLOYED = "DEPLOYED",
    DEPLOY_FAILED = "DEPLOY_FAILED",
    PENDING_DESTROY = "PENDING_DESTROY",
    DESTROYED = "DESTROYED",
    DESTROY_FAILED = "DESTROY_FAILED",
}

export enum Health {
    HEALTHY = "HEALTHY",
    UNHEALTHY = "UNHEALTHY",
}

export const InstanceResource = {
    "auditData": {
        "createdBy": "admin",
        "updatedBy": "admin",
        "createdOn": "2024-01-06T21:56:15Z",
        "updatedOn": "2024-09-07T17:58:07Z"
    },
    "name": "Instance",
    "namespace": {
        "name": "default"
    },
    "properties": {
        "additionalConfig": {
            "type": "OBJECT",
            "annotations": {
                "SourceMatchKey": "5f6adbbcac19"
            }
        },
        "adminPassword": {
            "type": "STRING",
            "description": "The admin password of the instance",
            "annotations": {
                "SourceMatchKey": "8dddaca3e3bf"
            }
        },
        "auditData": {
            "type": "STRUCT",
            "typeRef": "AuditData",
            "exampleValue": {
                "createdBy": "admin",
                "createdOn": "2024-04-12T19:16:01Z",
                "updatedBy": "admin",
                "updatedOn": "2024-04-12T19:16:01Z"
            },
            "title": "Audit Data",
            "description": "The audit data of the resource/record. \nIt contains information about who created the resource/record, when it was created, who last updated the resource/record and when it was last updated.",
            "annotations": {
                "SourceMatchKey": "87b0f72756b1",
                "SpecialProperty": "true"
            }
        },
        "backendVersion": {
            "type": "STRING",
            "required": true,
            "defaultValue": "1.0.0",
            "description": "The version of the api-brew",
            "annotations": {
                "SourceMatchKey": "6386270a55af"
            }
        },
        "branch": {
            "type": "STRING",
            "required": true,
            "defaultValue": "master",
            "annotations": {
                "SourceMatchKey": "6a71a6452ca2"
            }
        },
        "cluster": {
            "type": "STRING",
            "required": true,
            "defaultValue": "default",
            "description": "The cluster of the instance",
            "annotations": {
                "SourceMatchKey": "c170e66ed095"
            }
        },
        "controllerAccessToken": {
            "type": "STRING",
            "length": 5000,
            "description": "The controller access token of the instance",
            "annotations": {
                "SourceMatchKey": "b51bec60e577"
            }
        },
        "database": {
            "type": "REFERENCE",
            "required": true,
            "reference": "default/Database",
            "annotations": {
                "SourceMatchKey": "e51947811ae9"
            }
        },
        "deploymentStatus": {
            "type": "ENUM",
            "required": true,
            "defaultValue": "PENDING",
            "enumValues": [
                "PENDING",
                "PENDING_DEPLOY",
                "DEPLOYED",
                "DEPLOY_FAILED",
                "PENDING_DESTROY",
                "DESTROYED",
                "DESTROY_FAILED"
            ],
            "annotations": {
                "SourceMatchKey": "ec942fc5e6f1"
            }
        },
        "description": {
            "type": "STRING",
            "annotations": {
                "SourceMatchKey": "c0686c19184a"
            }
        },
        "disableBuiltinNanoEngine": {
            "type": "BOOL",
            "annotations": {
                "SourceMatchKey": "cf2e3a897641"
            }
        },
        "domain": {
            "type": "STRING",
            "annotations": {
                "SourceMatchKey": "b3c55bda0d78"
            }
        },
        "health": {
            "type": "ENUM",
            "required": true,
            "defaultValue": "HEALTHY",
            "enumValues": [
                "HEALTHY",
                "UNHEALTHY"
            ],
            "annotations": {
                "SourceMatchKey": "ff1e0040c646"
            }
        },
        "id": {
            "type": "UUID",
            "primary": true,
            "required": true,
            "immutable": true,
            "exampleValue": "a39621a4-6d48-11ee-b962-0242ac120002",
            "description": "The unique identifier of the resource. It is randomly generated and immutable.",
            "annotations": {
                "SourceMatchKey": "890fd5543be7",
                "SpecialProperty": "true"
            }
        },
        "modules": {
            "type": "OBJECT",
            "annotations": {
                "SourceMatchKey": "600e68f98eb8"
            }
        },
        "name": {
            "type": "STRING",
            "required": true,
            "unique": true,
            "description": "The name of the account",
            "annotations": {
                "SourceMatchKey": "abc550bb27f4"
            }
        },
        "namespace": {
            "type": "STRING",
            "required": true,
            "defaultValue": "instances",
            "description": "The namespace of the instance",
            "annotations": {
                "SourceMatchKey": "0518f80180c7"
            }
        },
        "owner": {
            "type": "STRING",
            "annotations": {
                "SourceMatchKey": "ae039a7342cc"
            }
        },
        "paidPlanUntil": {
            "type": "TIMESTAMP",
            "annotations": {
                "SourceMatchKey": "0946bf23d6fd"
            }
        },
        "plan": {
            "type": "REFERENCE",
            "reference": "default/InstancePlan",
            "annotations": {
                "SourceMatchKey": "246563332373"
            }
        },
        "replicaCount": {
            "type": "INT32",
            "required": true,
            "defaultValue": 1,
            "description": "The number of replicas of the instance",
            "annotations": {
                "SourceMatchKey": "4a1cbcf7b646"
            }
        },
        "title": {
            "type": "STRING",
            "annotations": {
                "SourceMatchKey": "6a2169ce0f01"
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
                "SourceMatchKey": "1dd11388923e",
                "SpecialProperty": "true"
            }
        }
    },
    "types": [
        {
            "name": "AuditData",
            "title": "Audit Data",
            "description": "Audit Data is a type that represents the audit data of a resource/record. ",
            "properties": {
                "createdBy": {
                    "type": "STRING",
                    "immutable": true,
                    "length": 256,
                    "exampleValue": "admin",
                    "title": "Created By",
                    "description": "The user who created the resource/record.",
                    "annotations": {
                        "SpecialProperty": "true"
                    }
                },
                "createdOn": {
                    "type": "TIMESTAMP",
                    "immutable": true,
                    "exampleValue": "2024-04-12T19:16:01Z",
                    "title": "Created On",
                    "description": "The timestamp when the resource/record was created.",
                    "annotations": {
                        "SpecialProperty": "true"
                    }
                },
                "updatedBy": {
                    "type": "STRING",
                    "length": 256,
                    "exampleValue": "admin",
                    "title": "Updated By",
                    "description": "The user who last updated the resource/record.",
                    "annotations": {
                        "SpecialProperty": "true"
                    }
                },
                "updatedOn": {
                    "type": "TIMESTAMP",
                    "exampleValue": "2024-04-12T19:16:01Z",
                    "title": "Updated On",
                    "description": "The timestamp when the resource/record was last updated.",
                    "annotations": {
                        "SpecialProperty": "true"
                    }
                }
            }
        }
    ],
    "annotations": {
        "EnableAudit": "true"
    }
} as unknown

