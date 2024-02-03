import {LoadingOverlay} from "../../components/LoadingOverlay";
import {useEffect} from "react";
import {DeploymentStatus, Instance, InstanceEntityInfo} from "../model/instance";
import {useClient, useRepository, useTokenBody} from "@apibrew/react";
import {useNavigate} from "react-router-dom";
import {BooleanExpression} from "@apibrew/client/model/permission";
import {Database} from "../model/database";

export function PostLoginPage() {
    const instanceRepo = useRepository<Instance>(InstanceEntityInfo);
    const navigate = useNavigate()
    const tokenBody = useTokenBody()

    async function handleNext() {
        const instances = (await instanceRepo.list({
            limit: 2,
            query: {
                not: {
                    equal: {
                        left: {
                            property: 'deploymentStatus'
                        },
                        right: {
                            value: DeploymentStatus.DESTROYED as any,
                        }
                    }
                }
            } as BooleanExpression
        })).content;

        console.log(instances)

        if (instances.length === 0) {
            instances.push(await handleCreateInstance())
        }

        if (instances.length === 1) {
            navigate(`/cloud/instances/${instances[0].id}/goto`)
            return
        }

        if (instances.length > 1) {
            navigate('/cloud/instances')
            return
        }
    }

    async function handleCreateInstance() {
        return await instanceRepo.create({
            name: 'new-project',
            plan: {
                name: 'free',
            },
            owner: tokenBody.username,
            database: {
                name: 'dummy',
            } as Database
        } as Instance)
    }

    useEffect(() => {
        handleNext()
    }, []);

    return <LoadingOverlay/>
}