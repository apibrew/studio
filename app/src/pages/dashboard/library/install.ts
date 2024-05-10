import {Client} from "@apibrew/client";
import {Package, PackageEntityInfo, Status} from "../../../model/package";
import {Step} from "./PackageDetails";
import {Module, ModuleEntityInfo} from "@apibrew/client/nano/model/module";
import {loadPackageDetails, readFile} from "./helper";
import {Script, ScriptEntityInfo} from "@apibrew/client/nano/model/script";
import toast from "react-hot-toast";

export async function install(client: Client, pkg: Package): Promise<boolean> {
    const id = toast.loading('Installing package...')


    const packageDetails = await loadPackageDetails(pkg)
    const installedPackage = await client.applyRecord<Package>(PackageEntityInfo, {
        ...pkg,
        status: Status.READY_TO_INSTALL,
    })

    for (const step of packageDetails.steps) {
        await executeStep(client, pkg, step)
    }

    installedPackage.status = Status.INSTALLED
    await client.updateRecord(PackageEntityInfo, installedPackage)

    toast.dismiss(id)

    return true
}

async function executeStep(client: Client, pkg: Package, step: Step) {
    const rName = `'${pkg.name}'`
    const rParams = JSON.stringify(pkg.params || {})

    switch (step.operation) {
        case 'applyModule': {
            let source = await readFile(pkg.repository, pkg.path + '/' + step.contentFile)
            let name = step.name

            if (name) {
                name = name.replace(/__NAME__/g, name)
            }

            source = source.replace(/__NAME__/g, rName)
            source = source.replace(/__PARAMS__/g, rParams)

            return client.applyRecord<Module>(ModuleEntityInfo, {
                name: name,
                source: source,
            })
        }
        case 'applyScript': {
            let source = await readFile(pkg.repository, pkg.path + '/' + step.contentFile)

            source = source.replace(/__NAME__/g, rName)
            source = source.replace(/__PARAMS__/g, rParams)

            return client.applyRecord<Script>(ScriptEntityInfo, {
                source: source,
            })
        }
    }
}

