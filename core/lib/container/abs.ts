export type FilterPredicate<T> = (value: T) => boolean

export interface Container {
    registerComponent<T extends AbstractComponentType>(value: T, name?: string, primary?: boolean, order?: number): void;

    getComponentByType<T extends AbstractComponentType>(type: T["componentType"], filters?: FilterPredicate<T>): T;
    getComponentsByType<T extends AbstractComponentType>(type: T["componentType"], filters?: FilterPredicate<T>): T[];
}

export interface AbstractComponentType {
    componentType: string;
    name?: string;
    primary?: boolean;
    order?: number;
}
