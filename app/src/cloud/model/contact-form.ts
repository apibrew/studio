
export interface ContactForm {
    source?: string
    fullName: string
    subject?: string
    category?: string
    companyName?: string
    auditData?: AuditData
    phoneNumber?: string
    email: string
    message?: string
    version: number
    id: string
}

export const ContactFormEntityInfo = {
    namespace: "default",
    resource: "ContactForm",
    restPath: "contact-form",
}

export interface AuditData {
    updatedBy: string
    updatedOn: string | Date
    createdBy: string
    createdOn: string | Date
}

export const ContactFormResource = {
  "auditData": {
    "createdBy": "admin",
    "updatedBy": "system",
    "createdOn": "2024-01-06T21:56:17Z",
    "updatedOn": "2024-04-12T19:16:01Z"
  },
  "name": "ContactForm",
  "namespace": {
    "name": "default"
  },
  "properties": {
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
        "SpecialProperty": "true"
      }
    },
    "category": {
      "type": "STRING",
      "length": 128
    },
    "companyName": {
      "type": "STRING"
    },
    "email": {
      "type": "STRING",
      "required": true
    },
    "fullName": {
      "type": "STRING",
      "required": true
    },
    "id": {
      "type": "UUID",
      "primary": true,
      "required": true,
      "immutable": true,
      "exampleValue": "a39621a4-6d48-11ee-b962-0242ac120002",
      "description": "The unique identifier of the resource. It is randomly generated and immutable.",
      "annotations": {
        "SpecialProperty": "true"
      }
    },
    "message": {
      "type": "STRING",
      "length": 2048
    },
    "phoneNumber": {
      "type": "STRING"
    },
    "source": {
      "type": "STRING",
      "length": 128
    },
    "subject": {
      "type": "STRING",
      "length": 256
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
  "immutable": true,
  "annotations": {
    "AllowPublicCreateAccess": "true",
    "EnableAudit": "true"
  }
} as unknown

