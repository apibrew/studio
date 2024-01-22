export function label(record: any): string {
    const nameProps = ['name', 'username', 'title', 'label', 'id'];


    for (const nameProp of nameProps) {
        if (record[nameProp]) {
            return record[nameProp];
        }
    }

    return record + '';
}