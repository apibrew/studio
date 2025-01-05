import {Client, Repository} from "@apibrew/client";
import {Resource} from "@apibrew/client/model";
import {isFileProperty} from "../util/property.ts";
import {Code, CodeEntityInfo, Language} from "@apibrew/client/nano/model/code";

export class ResourceService {
    private readonly nanoRepository: Repository<Code>;

    public constructor(private client: Client) {
        this.nanoRepository = client.repository<Code>(CodeEntityInfo)
    }

    public async createResource(resource: Resource) {
        await this.client.createResource(resource);

        await this.postSaveResource(resource)
    }

    public async updateResource(resource: Resource) {
        await this.client.updateResource(resource);

        await this.postSaveResource(resource)
    }

    private async postSaveResource(resource: Resource) {
        // add post modifier for files
        await this.prepareAutoNanoCode(resource);
    }

    private async prepareAutoNanoCode(resource: Resource) {
        const Resource = resource.name

        let nanoCode = `
const ${resource.name} = resource('${resource.namespace.name}/${resource.name}')
const File = resource('storage/File')

        `

        const properties = Object.keys(resource.properties || {})

        for (const propertyName of properties) {
            const property = resource.properties[propertyName]

            if (isFileProperty(property)) {
                nanoCode += `                
${Resource}.postModifier(record => {
    if (record.${propertyName}) {
        const file = File.load(record.${propertyName})
        record.${propertyName} = {id: file.id, downloadUrl: file.downloadUrl}
    }

    return record
})

                `
            }
        }

        const codeName = 'ResourceNanoAuto/' + resource.namespace.name + '/' + resource.name
        await this.nanoRepository.apply({
            name: codeName,
            content: nanoCode,
            language: Language.JAVASCRIPT,
        })
    }
}
