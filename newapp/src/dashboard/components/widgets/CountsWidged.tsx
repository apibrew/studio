import {BarChart} from '@mui/x-charts/BarChart';
import {useClient} from "@apibrew/react";
import {useEffect, useState} from "react";
import {ResourceEntityInfo} from "@apibrew/client/model/resource";
import {NamespaceEntityInfo} from "@apibrew/client/model/namespace";
import {UserEntityInfo} from "@apibrew/client/model/user";
import {LoadingOverlay} from "common";
import {CodeEntityInfo} from "@apibrew/client/nano/model/code";
import {FileEntityInfo} from "../../model/file.ts";
import {RoleEntityInfo} from "@apibrew/client/model/role";

export function CountsWidget() {
    const client = useClient()

    const [stats, setStats] = useState<{ [status: string]: number }>({})

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
                .then(response => newStats['userCount'] = response.total),
            client
                .repo(CodeEntityInfo).list({limit: 0})
                .then(response => newStats['nanoCode'] = response.total),
            client
                .repo(FileEntityInfo).list({limit: 0})
                .then(response => newStats['fileCount'] = response.total),
            client
                .repo(RoleEntityInfo).list({limit: 0})
                .then(response => newStats['rolesCount'] = response.total),
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

    return <BarChart
        xAxis={[{data: ['Resources', 'Namespaces', 'Users', 'Roles', 'Nano Codes', 'Files'], scaleType: 'band'}]}
        series={[{data: [stats['resourceCount'], stats['namespaceCount'], stats['userCount'], stats['rolesCount'], stats['nanoCode'], stats['fileCount']]}]}
        height={200}
    />
}
