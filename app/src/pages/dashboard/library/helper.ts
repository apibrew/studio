import {Repository} from "../../../model/repository";
import {PackageDetails} from "./PackageDetails";
import {Package} from "../../../model/package";

export async function readFile(repository: Repository, path: string): Promise<string> {
    const url = `https://api.github.com/repos/${repository.owner}/${repository.repo}/contents/${path}`;

    const data = await (await fetch(url, {
        headers: {
            Authorization: `Bearer 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`
        }
    })).json()

    return atob(data.content);
}

export async function loadPackageDetails(pkg: Package): Promise<PackageDetails> {
    const content = await readFile(pkg.repository, `${pkg.path}/package-details.json`)

    return JSON.parse(content) as PackageDetails
}
