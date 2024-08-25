export function handleErrorMessage(err: any): string {
    if (err.code === 'UNIQUE_VIOLATION') {
        return 'Unique constraint violation'
    }

    return err.message
}
