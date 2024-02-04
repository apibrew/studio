import React, {useEffect} from "react";
import {useClient} from "@apibrew/react";
import {LoadingOverlay} from "../LoadingOverlay";
import {WidgetLayout} from "../../layout/WidgetLayout";
import {Table, TableBody, TableCell, TableHead, TableRow} from "@mui/material";
import {ResourceEntityInfo} from "@apibrew/client/model/resource";
import {NamespaceEntityInfo} from "@apibrew/client/model/namespace";
import {UserEntityInfo} from "@apibrew/client/model/user";

export function GeneralStatsWidget() {
    const client = useClient()

    const [stats, setStats] = React.useState<{ [status: string]: number }>({})

    useEffect(() => {
        let newStats: { [status: string]: number } = {}

        Promise.all([
            client
                .repo(ResourceEntityInfo).list({limit: 0})
                .then(response => newStats['resourceCount'] = response.total),
            client
                .repo(NamespaceEntityInfo).list({limit: 0})
                .then(response => newStats['namespaceCount'] = response.total),
            client
                .repo(UserEntityInfo).list({limit: 0})
                .then(response => newStats['userCount'] = response.total)
        ]).then(() => {
            setStats(newStats)
        })
    }, []);

    if (!stats) {
        return <LoadingOverlay/>
    }

    return <WidgetLayout title='General Stats'>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Factor</TableCell>
                    <TableCell>Count</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>Resource/Api count</TableCell>
                    <TableCell>{stats['resourceCount']}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>Namespace count</TableCell>
                    <TableCell>{stats['namespaceCount']}</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>User count</TableCell>
                    <TableCell>{stats['userCount']}</TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </WidgetLayout>
}