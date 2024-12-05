import toast from "react-hot-toast";
import {Repository} from "@apibrew/client";
import {DeploymentTask, Kind} from "../model/deployment-task.ts";
import {Instance} from "../model/instance.ts";

export const handleDeploymentTask = (deploymentTaskRepository: Repository<DeploymentTask>, instance: Instance, kind: Kind) => {
    const promise = deploymentTaskRepository.create({
        user: instance.owner,
        instance: instance,
        kind: kind,
        status: "PENDING"
    } as DeploymentTask)

    let loadingMessage = ''
    let successMessage = '';

    switch (kind) {
        case Kind.DEPLOY:
            loadingMessage = 'Deploying...'
            successMessage = 'Deployed!'
            break;
        case Kind.UPGRADE:
            loadingMessage = 'Upgrading...'
            successMessage = 'Upgraded!'
            break;
        case Kind.DESTROY:
            loadingMessage = 'Destroying...'
            successMessage = 'Destroyed!'
            break;
        case Kind.RESTART:
            loadingMessage = 'Restarting...'
            successMessage = 'Restarted!'
            break;
    }

    return toast.promise(promise, {
        loading: loadingMessage,
        success: <b>{successMessage} </b>,
        error: err => 'Build failed: ' + err.message,
    })
}
