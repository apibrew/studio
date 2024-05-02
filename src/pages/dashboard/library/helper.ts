import {Repository} from "../../../model/repository";

export async function readFile(repository: Repository, path: string): Promise<string> {
    const url = `https://api.github.com/repos/${repository.owner}/${repository.repo}/contents/${path}`;

    const data = await (await fetch(url)).json()

    return atob(data.content);
}
