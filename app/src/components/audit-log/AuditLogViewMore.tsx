import {AuditLog} from "@apibrew/react";
import {Box, Card, CardActions, CardContent, CardHeader} from "@mui/material";
import Button from "@mui/material/Button";

export interface AuditLogViewMoreProps {
    auditLog: AuditLog
    onClose: () => void
}

export function AuditLogViewMore(props: AuditLogViewMoreProps) {
    return <Card>
        <CardHeader title={'Audit Log'}/>
        <CardContent>
            <Box width='600px' maxHeight='400px' overflow='auto'>
                <pre>
                    {JSON.stringify(props.auditLog.properties, null, 2)}
                </pre>
            </Box>
        </CardContent>
        <CardActions>
            <Button onClick={props.onClose}>Close</Button>
        </CardActions>
    </Card>
}
