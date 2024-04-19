declare function resource<T>(type: string): ResourceOps<T>;
declare function resource<T>(resoureDef: any): ResourceOps<T>;

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
    list(): T[]
    get(id: string): T
    apply(entity: T): T
    load(entity: Partial<T>, loadParams: LoadParams): T
}

declare const Resource: ResourceOps<Resource>
