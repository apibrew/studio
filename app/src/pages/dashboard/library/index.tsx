import {ensureResource} from "../../../logic/ensure-resource";
import {Package, PackageEntityInfo, PackageResource, Status} from "../../../model/package";
import {Resource, useClient} from "@apibrew/react";
import {Repository, RepositoryEntityInfo, RepositoryResource} from "../../../model/repository";
import {useEffect, useState} from "react";
import {LoadingOverlay} from "common";
import {Client} from "@apibrew/client";
import {Box, Stack, Table, TableCell, TableHead, TableRow} from "@mui/material";
import {useDrawer} from "../../../hooks/use-drawer";
import Button from "@mui/material/Button";
import {PackagePage} from "./Package";
import {readFile} from "./helper";
import toast from "react-hot-toast";
import {install} from "./install";
import {uninstall} from "./uninstall";
import {useConfirmation} from "../../../components/modal/use-confirmation";

export default function Page() {
    const client = useClient()
    const [loading, setLoading] = useState(true)
    const [candidatePackages, setCandidatePackages] = useState<Package[]>([])
    const [existingPackages, setExistingPackages] = useState<Package[]>([])
    const [wi, setWi] = useState(0)
    const drawer = useDrawer()
    const confirmation = useConfirmation()

    useEffect(() => {
        const promises = [
            ensureResource(client, PackageResource as Resource),
            ensureResource(client, RepositoryResource as Resource),
            client.listRecords<Package>(PackageEntityInfo, {limit: 100, resolveReferences: ['$.repository']})
                .then(resp => resp.content)
                .then(setExistingPackages),
            listCandidatePackages(client).then(setCandidatePackages)
        ]

        Promise.all(promises).then(() => {
            setLoading(false)
        })
    }, [wi, client]);

    if (loading) {
        return <LoadingOverlay/>
    }

    function openInstaller(pkg: Package) {
        drawer.open(<PackagePage
            pkg={pkg}
            params={pkg.params || {}}
            cancel={() => drawer.close()}
            install={(name, params) => {
                install(client, {...pkg, name: name, params: params}).then(installed => {
                    if (installed) {
                        toast.success('Package installed')
                        drawer.close()
                    }

                    setWi(wi + 1)
                })
            }}
        />)
    }

    function openUnInstaller(pkg: Package) {
        confirmation.open({
            kind: 'danger',
            title: 'Uninstall Package',
            message: 'Are you sure you want to uninstall this package?',
            onConfirm: () => {
                uninstall(client, pkg).then(installed => {
                    if (installed) {
                        toast.success('Package Uninstalled')
                        drawer.close()
                    }

                    setWi(wi + 1)
                })
            }
        })
    }

    return <Box m={1}>
        {drawer.render()}
        {confirmation.render()}
        <h2>Packages</h2>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Repository</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
                {existingPackages.map(pkg => <TableRow>
                    <TableCell>{pkg.id}</TableCell>
                    <TableCell>{pkg.name}</TableCell>
                    <TableCell>{pkg.repository.owner}/{pkg.repository.repo}/{pkg.path}</TableCell>
                    <TableCell>{pkg.status}</TableCell>
                    <TableCell>
                        <Stack direction='row' spacing={1}>
                            {pkg.status === Status.READY_TO_INSTALL && <Button color='success' onClick={() => {
                                openInstaller(pkg)
                            }}>Install</Button>}
                            {pkg.status === Status.INSTALLED && <Button color='primary' onClick={() => {
                                openInstaller(pkg)
                            }}>Configure</Button>}
                            {pkg.status === Status.INSTALLED && <Button color='secondary' onClick={() => {
                                install(client, pkg).then(installed => {
                                    if (installed) {
                                        toast.success('Package reinstalled')
                                        drawer.close()
                                    }

                                    setWi(wi + 1)
                                })
                            }}>Reinstall</Button>}
                            {pkg.status === Status.INSTALLED && <Button color='error' onClick={() => {
                                openUnInstaller(pkg)
                            }}>Uninstall</Button>}
                            {pkg.status === Status.UNINSTALLED && <Button onClick={() => {
                                confirmation.open({
                                    kind: 'danger',
                                    title: 'Delete Package',
                                    message: 'Are you sure you want to delete this package?',
                                    onConfirm: () => {
                                        client.deleteRecord(PackageEntityInfo, pkg.id).then(() => {
                                            setWi(wi + 1)
                                        })
                                    }
                                })
                            }}>Delete</Button>}
                        </Stack>
                    </TableCell>
                </TableRow>)}
            </TableHead>
        </Table>
        <h2>Library</h2>

        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Repository</TableCell>
                    <TableCell>Actions</TableCell>
                </TableRow>
                {candidatePackages.map(pkg => <TableRow>
                    <TableCell>{pkg.id}</TableCell>
                    <TableCell>{pkg.name}</TableCell>
                    <TableCell>{pkg.repository.owner}/{pkg.repository.repo}/{pkg.path}</TableCell>
                    <TableCell>
                        <Button color='success' onClick={() => {
                            openInstaller(pkg)
                        }}>Install</Button>
                    </TableCell>
                </TableRow>)}
            </TableHead>
        </Table>
    </Box>
}

async function listCandidatePackages(client: Client): Promise<Package[]> {
    const repositories = (await client.listRecords<Repository>(RepositoryEntityInfo, {limit: 100})).content
    const packages: Package[] = []

    for (const repository of repositories) {
        const data = JSON.parse(await readFile(repository, 'packages.json'))

        for (const item of data) {
            item.repository = repository
            packages.push(item)
        }
    }

    return packages;
}
