export type Annotations = {
    [key: string]: string | undefined;
}

export const isAnnotationEnabled = (annotations: Annotations | undefined, annotation: string): boolean => {
    return (annotations?.[annotation]) === 'true';
}

export const getAnnotation = (annotations: Annotations | undefined, annotation: string, defaultValue?: string): string => {
    return annotations?.[annotation] ?? defaultValue ?? '';
}