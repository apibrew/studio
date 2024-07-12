
export interface CompanyProfile {
    phone?: string
    city?: string
    cik?: string
    address?: string
    country?: string
    cusip?: string
    defaultImage?: boolean
    ceo?: string
    symbol: string
    companyName?: string
    state?: string
    id: string
    beta?: number
    isin?: string
    fullTimeEmployees?: string
    dcf?: number
    image?: string
    volAvg?: number
    dcfDiff?: number
    currency?: string
    isFund?: boolean
    isActivelyTrading?: boolean
    mktCap?: number
    range?: string
    website?: string
    changes?: number
    industry?: string
    description?: string
    price?: number
    isEtf?: boolean
    exchangeShortName?: string
    exchange?: string
    ipoDate?: string
    sector?: string
    isAdr?: boolean
    lastDiv?: number
    zip?: string
    version: number
}

export const CompanyProfileEntityInfo = {
    namespace: "fmp",
    resource: "CompanyProfile",
    restPath: "fmp-company-profile",
}

export const CompanyProfileResource = {
  "auditData": {
    "createdBy": "system",
    "updatedBy": "system",
    "createdOn": "2024-07-06T15:16:31Z",
    "updatedOn": "2024-07-09T18:06:24Z"
  },
  "name": "CompanyProfile",
  "namespace": {
    "name": "fmp"
  },
  "properties": {
    "address": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "f4975c3428c7"
      }
    },
    "beta": {
      "type": "FLOAT64",
      "annotations": {
        "SourceMatchKey": "a3818d7a70f4"
      }
    },
    "ceo": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "f06decd88931"
      }
    },
    "changes": {
      "type": "FLOAT64",
      "annotations": {
        "SourceMatchKey": "2295dc01a0fa"
      }
    },
    "cik": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "b157a8c31c51"
      }
    },
    "city": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "37616f9d572c"
      }
    },
    "companyName": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "aee8bebf3dde"
      }
    },
    "country": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "d8f0816fc599"
      }
    },
    "currency": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "bf54f807ebd5"
      }
    },
    "cusip": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "69798eabce67"
      }
    },
    "dcf": {
      "type": "FLOAT64",
      "annotations": {
        "SourceMatchKey": "dc55af229ff0"
      }
    },
    "dcfDiff": {
      "type": "FLOAT64",
      "annotations": {
        "SourceMatchKey": "63ccb67ea859"
      }
    },
    "defaultImage": {
      "type": "BOOL",
      "annotations": {
        "SourceMatchKey": "376fc4207e90"
      }
    },
    "description": {
      "type": "STRING",
      "length": 50000,
      "annotations": {
        "SourceMatchKey": "f134dc3c9fde"
      }
    },
    "exchange": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "a94c79ff7e87"
      }
    },
    "exchangeShortName": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "27c2119e0d6f"
      }
    },
    "fullTimeEmployees": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "e4b8e1d4cfbc"
      }
    },
    "id": {
      "type": "UUID",
      "primary": true,
      "required": true,
      "immutable": true,
      "exampleValue": "a39621a4-6d48-11ee-b962-0242ac120002",
      "annotations": {
        "SourceMatchKey": "e197b65b1e18",
        "SpecialProperty": "true"
      }
    },
    "image": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "2764034f76d8"
      }
    },
    "industry": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "1adb2d399b68"
      }
    },
    "ipoDate": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "f5747cb7eedc"
      }
    },
    "isActivelyTrading": {
      "type": "BOOL",
      "annotations": {
        "SourceMatchKey": "a3cfff1bc86a"
      }
    },
    "isAdr": {
      "type": "BOOL",
      "annotations": {
        "SourceMatchKey": "66e874f819e2"
      }
    },
    "isEtf": {
      "type": "BOOL",
      "annotations": {
        "SourceMatchKey": "cd35f09338c3"
      }
    },
    "isFund": {
      "type": "BOOL",
      "annotations": {
        "SourceMatchKey": "13bddc4b2205"
      }
    },
    "isin": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "6740a698764f"
      }
    },
    "lastDiv": {
      "type": "FLOAT64",
      "annotations": {
        "SourceMatchKey": "6739b19aa900"
      }
    },
    "mktCap": {
      "type": "INT64",
      "annotations": {
        "SourceMatchKey": "f868f14a5e71"
      }
    },
    "phone": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "35ea9f789445"
      }
    },
    "price": {
      "type": "FLOAT64",
      "annotations": {
        "SourceMatchKey": "9704b29cf194"
      }
    },
    "range": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "08efe43dbc5d"
      }
    },
    "sector": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "3a7aa4a3c04f"
      }
    },
    "state": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "396bf2bbf223"
      }
    },
    "symbol": {
      "type": "STRING",
      "required": true,
      "unique": true,
      "annotations": {
        "SourceMatchKey": "90a0b8d00a12"
      }
    },
    "version": {
      "type": "INT32",
      "required": true,
      "defaultValue": 1,
      "exampleValue": 1,
      "annotations": {
        "AllowEmptyPrimitive": "true",
        "SourceMatchKey": "4c76b7e4d56a",
        "SpecialProperty": "true"
      }
    },
    "volAvg": {
      "type": "FLOAT64",
      "annotations": {
        "SourceMatchKey": "c7df573d24bd"
      }
    },
    "website": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "d015df76db09"
      }
    },
    "zip": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "b56b77734df9"
      }
    }
  },
  "description": "CompanyProfile"
} as unknown

