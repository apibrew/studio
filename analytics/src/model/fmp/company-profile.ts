
export interface CompanyProfile {
    companyName?: string
    state?: string
    industry?: string
    isEtf?: boolean
    image?: string
    description?: string
    isFund?: boolean
    dcf?: number
    id: string
    dcfDiff?: number
    volAvg?: number
    defaultImage?: boolean
    isActivelyTrading?: boolean
    currency?: string
    symbol: string
    exchange?: string
    address?: string
    sector?: string
    isin?: string
    ceo?: string
    changes?: number
    beta?: number
    isAdr?: boolean
    city?: string
    range?: string
    exchangeShortName?: string
    cusip?: string
    ipoDate?: string
    country?: string
    zip?: string
    version: number
    fullTimeEmployees?: string
    lastDiv?: number
    website?: string
    price?: number
    mktCap?: number
    phone?: string
    cik?: string
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
    "updatedOn": "2024-07-18T09:31:09Z"
  },
  "name": "CompanyProfile",
  "namespace": {
    "name": "fmp"
  },
  "properties": {
    "address": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "15a882df2299"
      }
    },
    "beta": {
      "type": "FLOAT64",
      "annotations": {
        "SourceMatchKey": "7611aa168948"
      }
    },
    "ceo": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "f64e251bd744"
      }
    },
    "changes": {
      "type": "FLOAT64",
      "annotations": {
        "SourceMatchKey": "f1ef4f52b87f"
      }
    },
    "cik": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "b6d7ecb436a0"
      }
    },
    "city": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "ffd1978eebea"
      }
    },
    "companyName": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "a8e5e8e41723"
      }
    },
    "country": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "6579424e5634"
      }
    },
    "currency": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "b10fe4fc0a2d"
      }
    },
    "cusip": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "fbea9516c2ec"
      }
    },
    "dcf": {
      "type": "FLOAT64",
      "annotations": {
        "SourceMatchKey": "c2e6f29974f2"
      }
    },
    "dcfDiff": {
      "type": "FLOAT64",
      "annotations": {
        "SourceMatchKey": "4ade3ba170d1"
      }
    },
    "defaultImage": {
      "type": "BOOL",
      "annotations": {
        "SourceMatchKey": "d766e9f97c89"
      }
    },
    "description": {
      "type": "STRING",
      "length": 50000,
      "annotations": {
        "SourceMatchKey": "ff026447b6eb"
      }
    },
    "exchange": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "4cbaad89a972"
      }
    },
    "exchangeShortName": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "1e29485c858b"
      }
    },
    "fullTimeEmployees": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "867462f69f23"
      }
    },
    "id": {
      "type": "UUID",
      "primary": true,
      "required": true,
      "immutable": true,
      "exampleValue": "a39621a4-6d48-11ee-b962-0242ac120002",
      "annotations": {
        "SourceMatchKey": "bc511e62f73e",
        "SpecialProperty": "true"
      }
    },
    "image": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "579371cfe765"
      }
    },
    "industry": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "340b43969c94"
      }
    },
    "ipoDate": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "c74e24dd5afb"
      }
    },
    "isActivelyTrading": {
      "type": "BOOL",
      "annotations": {
        "SourceMatchKey": "373f71d48fcf"
      }
    },
    "isAdr": {
      "type": "BOOL",
      "annotations": {
        "SourceMatchKey": "e54b82c65004"
      }
    },
    "isEtf": {
      "type": "BOOL",
      "annotations": {
        "SourceMatchKey": "ccc941ff7131"
      }
    },
    "isFund": {
      "type": "BOOL",
      "annotations": {
        "SourceMatchKey": "445d3bb7594b"
      }
    },
    "isin": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "6fb656e85eac"
      }
    },
    "lastDiv": {
      "type": "FLOAT64",
      "annotations": {
        "SourceMatchKey": "b6fc7bbb80e0"
      }
    },
    "mktCap": {
      "type": "INT64",
      "annotations": {
        "SourceMatchKey": "f1ab428ae0dd"
      }
    },
    "phone": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "0be07209acb7"
      }
    },
    "price": {
      "type": "FLOAT64",
      "annotations": {
        "SourceMatchKey": "7d8693d76fb0"
      }
    },
    "range": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "39e0a11b10e8"
      }
    },
    "sector": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "e02e292ff683"
      }
    },
    "state": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "68fe3705523f"
      }
    },
    "symbol": {
      "type": "STRING",
      "required": true,
      "unique": true,
      "annotations": {
        "SourceMatchKey": "a68b22eba18d"
      }
    },
    "version": {
      "type": "INT32",
      "required": true,
      "defaultValue": 1,
      "exampleValue": 1,
      "annotations": {
        "AllowEmptyPrimitive": "true",
        "SourceMatchKey": "0ac3d91c97a6",
        "SpecialProperty": "true"
      }
    },
    "volAvg": {
      "type": "FLOAT64",
      "annotations": {
        "SourceMatchKey": "c6dfde05233f"
      }
    },
    "website": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "00fd6a75aedf"
      }
    },
    "zip": {
      "type": "STRING",
      "annotations": {
        "SourceMatchKey": "6c9afb6342a7"
      }
    }
  },
  "description": "CompanyProfile"
} as unknown

