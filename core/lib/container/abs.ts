export interface Container {
    registerComponent<T extends ComponentType>(value: T, name?: string, primary?: boolean): void;

    getComponentByType<T extends ComponentType>(type: T["componentType"]): T;
}

export interface ComponentType {
    componentType: string;
    name?: string;
    primary?: boolean;
}
