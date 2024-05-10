declare interface Namespace {
    id: string
    version: number
    auditData?: AuditData
    name: string
    description?: string
    details?: object
}

declare const NamespaceEntityInfo = {
    namespace: "system",
    resource: "Namespace",
    restPath: "system-namespace",
}

declare interface AuditData {
    createdBy: string
    updatedBy: string
    createdOn: string | Date
    updatedOn: string | Date
}

declare interface DataSource {
    id: string
    version: number
    auditData?: AuditData
    name: string
    description?: string
    backend: Backend
    options: { [key: string]: string }
}

declare const DataSourceEntityInfo = {
    namespace: "system",
    resource: "DataSource",
    restPath: "system-data-source",
}

declare interface AuditData {
    createdBy: string
    updatedBy: string
    createdOn: string | Date
    updatedOn: string | Date
}

declare enum Backend {
    POSTGRESQL = "POSTGRESQL",
    MYSQL = "MYSQL",
    MONGODB = "MONGODB",
    REDIS = "REDIS",
    SQLITE = "SQLITE",
}

declare interface Resource {
    id: string
    version: number
    auditData?: AuditData
    name: string
    namespace: Namespace
    virtual: boolean
    properties: { [key: string]: Property }
    indexes?: Index[]
    types?: SubType[]
    immutable: boolean
    abstract: boolean
    checkReferences: boolean
    dataSource?: DataSource
    entity?: string
    catalog?: string
    title?: string
    description?: string
    annotations?: { [key: string]: string }
}

declare const ResourceEntityInfo = {
    namespace: "system",
    resource: "Resource",
    restPath: "resources",
}

declare interface Property {
    type: Type
    typeRef: string
    primary: boolean
    required: boolean
    unique: boolean
    immutable: boolean
    virtual: boolean
    length: number
    item: Property
    reference: string
    backReference: string
    defaultValue: object
    enumValues: string[]
    exampleValue: object
    title: string
    description: string
    annotations: { [key: string]: string }
}

declare interface SubType {
    name: string
    title: string
    description: string
    properties: { [key: string]: Property }
}

declare interface AuditData {
    createdBy: string
    updatedBy: string
    createdOn: string | Date
    updatedOn: string | Date
}

declare interface IndexProperty {
    name: string
    order: Order
}

declare interface Index {
    properties: IndexProperty[]
    indexType: IndexType
    unique: boolean
    annotations: { [key: string]: string }
}

declare enum Type {
    BOOL = "BOOL",
    STRING = "STRING",
    FLOAT32 = "FLOAT32",
    FLOAT64 = "FLOAT64",
    INT32 = "INT32",
    INT64 = "INT64",
    BYTES = "BYTES",
    UUID = "UUID",
    DATE = "DATE",
    TIME = "TIME",
    TIMESTAMP = "TIMESTAMP",
    OBJECT = "OBJECT",
    MAP = "MAP",
    LIST = "LIST",
    REFERENCE = "REFERENCE",
    ENUM = "ENUM",
    STRUCT = "STRUCT",
}

declare enum Order {
    UNKNOWN = "UNKNOWN",
    ASC = "ASC",
    DESC = "DESC",
}

declare enum IndexType {
    BTREE = "BTREE",
    HASH = "HASH",
}

declare interface Record {
    id: string
    properties: object
    packedProperties?: object[]
}

declare const RecordEntityInfo = {
    namespace: "system",
    resource: "Record",
    restPath: "system-record",
}

declare interface Extension {
    id: string
    version: number
    auditData?: AuditData
    name: string
    description?: string
    selector?: EventSelector
    order: number
    finalizes: boolean
    sync: boolean
    responds: boolean
    call: ExternalCall
    annotations?: { [key: string]: string }
}

declare const ExtensionEntityInfo = {
    namespace: "system",
    resource: "Extension",
    restPath: "system-extension",
}

declare interface BooleanExpression {
    and: BooleanExpression[]
    or: BooleanExpression[]
    not: BooleanExpression
    equal: PairExpression
    lessThan: PairExpression
    greaterThan: PairExpression
    lessThanOrEqual: PairExpression
    greaterThanOrEqual: PairExpression
    in: PairExpression
    isNull: Expression
    regexMatch: RegexMatchExpression
}

declare interface PairExpression {
    left: Expression
    right: Expression
}

declare interface RegexMatchExpression {
    pattern: string
    expression: Expression
}

declare interface Expression {
    property: string
    value: object
}

declare interface AuditData {
    createdBy: string
    updatedBy: string
    createdOn: string | Date
    updatedOn: string | Date
}

declare interface FunctionCall {
    host: string
    functionName: string
}

declare interface HttpCall {
    uri: string
    method: string
}

declare interface ChannelCall {
    channelKey: string
}

declare interface ExternalCall {
    functionCall: FunctionCall
    httpCall: HttpCall
    channelCall: ChannelCall
}

declare interface EventSelector {
    actions: Action[]
    recordSelector: BooleanExpression
    namespaces: string[]
    resources: string[]
    ids: string[]
    annotations: { [key: string]: string }
}

declare interface RecordSearchParams {
    query: BooleanExpression
    limit: number
    offset: number
    resolveReferences: string[]
}

declare interface Event {
    id: string
    action: Action
    recordSearchParams: RecordSearchParams
    actionSummary: string
    actionDescription: string
    resource: Resource
    records: Record[]
    finalizes: boolean
    sync: boolean
    time: string | Date
    total: number
    actionName: string
    input: object
    output: object
    annotations: { [key: string]: string }
    error: Error
}

declare interface ErrorField {
    recordId: string
    property: string
    message: string
    value: object
}

declare interface Error {
    code: Code
    message: string
    fields: ErrorField[]
}

declare enum Action {
    CREATE = "CREATE",
    UPDATE = "UPDATE",
    DELETE = "DELETE",
    GET = "GET",
    LIST = "LIST",
    OPERATE = "OPERATE",
}

declare enum Code {
    UNKNOWN_ERROR = "UNKNOWN_ERROR",
    RECORD_NOT_FOUND = "RECORD_NOT_FOUND",
    UNABLE_TO_LOCATE_PRIMARY_KEY = "UNABLE_TO_LOCATE_PRIMARY_KEY",
    INTERNAL_ERROR = "INTERNAL_ERROR",
    PROPERTY_NOT_FOUND = "PROPERTY_NOT_FOUND",
    RECORD_VALIDATION_ERROR = "RECORD_VALIDATION_ERROR",
    RESOURCE_VALIDATION_ERROR = "RESOURCE_VALIDATION_ERROR",
    AUTHENTICATION_FAILED = "AUTHENTICATION_FAILED",
    ALREADY_EXISTS = "ALREADY_EXISTS",
    ACCESS_DENIED = "ACCESS_DENIED",
    BACKEND_ERROR = "BACKEND_ERROR",
    UNIQUE_VIOLATION = "UNIQUE_VIOLATION",
    REFERENCE_VIOLATION = "REFERENCE_VIOLATION",
    RESOURCE_NOT_FOUND = "RESOURCE_NOT_FOUND",
    UNSUPPORTED_OPERATION = "UNSUPPORTED_OPERATION",
    EXTERNAL_BACKEND_COMMUNICATION_ERROR = "EXTERNAL_BACKEND_COMMUNICATION_ERROR",
    EXTERNAL_BACKEND_ERROR = "EXTERNAL_BACKEND_ERROR",
    RATE_LIMIT_ERROR = "RATE_LIMIT_ERROR",
}
