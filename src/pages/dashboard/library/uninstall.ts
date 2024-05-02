import {Client} from "@apibrew/client";
import {Package, PackageEntityInfo, Status} from "../../../model/package";
import {loadPackageDetails, readFile} from "./helper";
import {Script, ScriptEntityInfo} from "@apibrew/client/nano/model/script";

export async function uninstall(client: Client, pkg: Package): Promise<boolean> {
    const packageDetails = await loadPackageDetails(pkg)

    if (packageDetails.uninstallScript) {
        await client.createRecord<Script>(ScriptEntityInfo, {
            source: await readFile(pkg.repository, pkg.path + '/' + packageDetails.uninstallScript),
        } as Script)
    }

    pkg.name = pkg.name + '-uninstalled-' + Date.now()

    pkg.status = Status.UNINSTALLED
    await client.updateRecord(PackageEntityInfo, pkg)

    return true
}

