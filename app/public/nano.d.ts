declare function resource<T = any>(type: string): ResourceOps<T>;
declare function resource<T = any>(resoureDef: any): ResourceOps<T>;

declare interface LoadParams {
    resolveReferences: string[]
}

declare interface ResourceOps<T> {
    // handler methods
    beforeCreate(handler: (entity: T, event: Event) => T): void

    afterCreate(handler: (entity: T, event: Event) => T): void

    beforeUpdate(handler: (entity: T, event: Event) => T): void

    afterUpdate(handler: (entity: T, event: Event) => T): void

    beforeList(handler: (entity: T, event: Event) => T): void

    afterList(handler: (entity: T, event: Event) => T): void

    beforeGet(handler: (entity: T, event: Event) => T): void

    afterGet(handler: (entity: T, event: Event) => T): void

    beforeDelete(handler: (entity: T, event: Event) => T): void

    afterDelete(handler: (entity: T, event: Event) => T): void

    // api methods
    create(entity: T): T

    update(entity: T): T

    list(): {content: T[], total: number}

    get(id: string): T

    apply(entity: T): T

    load(entity: Partial<T>, loadParams?: LoadParams): T
}

declare const Resource: ResourceOps<Resource>

declare interface ResponseBody {
    text(): string

    json(): any
}

declare interface HttpResponse {
    statusCode: number
    headers: { [key: string]: string }
    body: ResponseBody
}

declare interface Options {
    headers?: { [key: string]: string }
}

declare const http: {
    get(url: string, options?: Options): HttpResponse
    post(url: string, body: any, options?: Options): HttpResponse
    put(url: string, body: any, options?: Options): HttpResponse
    patch(url: string, body: any, options?: Options): HttpResponse
    delete(url: string, options?: Options): HttpResponse
}

declare const exports: {[key: string]: any}
