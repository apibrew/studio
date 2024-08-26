export function handleErrorMessage(err: any, customMessages?: {[code: string]: string}): string {
    if (customMessages && err.code in customMessages) {
        return customMessages[err.code]
    }

    if (err.code === 'UNIQUE_VIOLATION') {
        return 'Unique constraint violation'
    }
    if (err.code === 'REFERENCE_VIOLATION') {
        return 'Unique constraint violation'
    }

    return err.message
}
