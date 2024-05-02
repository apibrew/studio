import {ensureResource} from "../../../logic/ensure-resource";
import {Package, PackageEntityInfo, PackageResource, Status} from "../../../model/package";
import {Resource, useClient} from "@apibrew/react";
import {Repository, RepositoryEntityInfo, RepositoryResource} from "../../../model/repository";
import {useEffect, useState} from "react";
import {LoadingOverlay} from "../../../components/LoadingOverlay";
import {Client} from "@apibrew/client";
import {Box, Card, CardActions, CardHeader, Stack} from "@mui/material";
import {useDrawer} from "../../../hooks/use-drawer";
import Button from "@mui/material/Button";
import {PackagePage} from "./Package";
import {PackageDetails, Params, Step} from "./PackageDetails";
import {Module, ModuleEntityInfo} from "@apibrew/client/nano/model/module";
import {readFile} from "./helper";
import {Script, ScriptEntityInfo} from "@apibrew/client/nano/model/script";
import toast from "react-hot-toast";

export default function Page() {
    const client = useClient()
    const [loading, setLoading] = useState(true)
    const [candidatePackages, setCandidatePackages] = useState<Package[]>([])
    const drawer = useDrawer()

    useEffect(() => {
        const promises = [
            ensureResource(client, PackageResource as Resource),
            ensureResource(client, RepositoryResource as Resource),
            listCandidatePackages(client).then(setCandidatePackages)
        ]

        Promise.all(promises).then(() => {
            setLoading(false)
        })
    }, [client]);

    if (loading) {
        return <LoadingOverlay/>
    }

    return <Box>
        {drawer.render()}
        {candidatePackages.map((pkg) => <Stack m={3} spacing={3}>
            <Card>
                <CardHeader title={pkg.name} subheader={`${pkg.repository.owner}/${pkg.repository.repo}/${pkg.name}`}/>
                <CardActions>
                    <Button onClick={() => {
                        drawer.open(<PackagePage
                            pkg={pkg}
                            cancel={() => drawer.close()}
                            install={(name, details, params) => {
                                install(client, pkg, name, details, params).then(installed => {
                                    if (installed) {
                                        toast.success('Package installed')
                                        drawer.close()
                                    }
                                })
                            }}
                        />)
                    }}>Setup</Button>
                </CardActions>
            </Card>

        </Stack>)}
    </Box>
}

async function listCandidatePackages(client: Client): Promise<Package[]> {
    const repositories = (await client.listRecords<Repository>(RepositoryEntityInfo, {limit: 100})).content

    console.log(repositories)

    const packages: Package[] = []

    for (const repository of repositories) {
        const data = JSON.parse(await readFile(repository, 'packages.json'))

        console.log(data)

        for (const item of data) {
            item.repository = repository
            packages.push(item)
        }
    }

    return packages;
}

async function install(client: Client, pkg: Package, name: string, packageDetails: PackageDetails, params: Params): Promise<boolean> {
    const installedPackage = await client.applyRecord<Package>(PackageEntityInfo, {
        ...pkg,
        name: name,
        params: params,
        status: Status.READY_TO_INSTALL,
    })

    for (const step of packageDetails.steps) {
        await executeStep(client, pkg, installedPackage, step)
    }

    installedPackage.status = Status.INSTALLED
    client.updateRecord(PackageEntityInfo, installedPackage)

    return true
}

async function executeStep(client: Client, pkg: Package, installedPackage: Package, step: Step) {
    switch (step.operation) {
        case 'applyModule':
            return client.applyRecord<Module>(ModuleEntityInfo, {
                name: step.name,
                source: await readFile(pkg.repository, pkg.path + '/' + step.contentFile),
            })
        case 'applyScript':
            return client.applyRecord<Script>(ScriptEntityInfo, {
                source: await readFile(pkg.repository, pkg.path + '/' + step.contentFile),
            })
    }
}

