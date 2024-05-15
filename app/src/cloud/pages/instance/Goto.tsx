import {LoadingOverlay} from "../../../components/LoadingOverlay";
import {useNavigate, useParams} from "react-router-dom";
import {LocalStorageTokenStorage, useRecordBy, useRepository} from "@apibrew/react";
import {DeploymentStatus, Instance, InstanceEntityInfo} from "../../model/instance";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {Client, ClientImpl} from "@apibrew/client";
import Alert from "@mui/material/Alert";
import {ControllerAccessToken, ControllerAccessTokenEntityInfo} from "../../model/ops/controller-access-token";

export function Goto() {
    const params = useParams()
    const navigate = useNavigate()
    const [message, setMessage] = useState('')
    const controllerAccessTokenRepository = useRepository<ControllerAccessToken>(ControllerAccessTokenEntityInfo)

    const instance = useRecordBy<Instance>(InstanceEntityInfo, {
        id: params.id
    })

    async function awaitInstance(guestClient: Client, tokenStorage: LocalStorageTokenStorage) {
        for (let i = 0; i < 100; i++) {
            try {
                await guestClient.listResources()
                break
            } catch (e: any) {
                if (e.code === 'AUTHENTICATION_FAILED') {
                    tokenStorage.clear()
                    continue
                }
                console.error(e)
                await new Promise(resolve => setTimeout(resolve, 500))
            } finally {
                setMessage('Awaiting instance... ' + i + '/100')
            }
        }
    }

    async function handleInstance(instance: Instance, retry?: boolean) {
        if (retry) {
            setMessage('Awaiting instance[retry]...')
        }

        const guestClient = new ClientImpl(`https://${instance.name}.apibrew.io:8443`)
        const tokenStorage = new LocalStorageTokenStorage(instance.name)
        guestClient.useTokenStorage(tokenStorage)

        const prem = toast.loading('Loading Instance...')

        await awaitInstance(guestClient, tokenStorage)

        toast.dismiss(prem)
        setMessage('Authenticating...')
        const result = await controllerAccessTokenRepository.create({
            username: instance.owner,
            instance: instance.name,
        } as ControllerAccessToken)

        if (!result) {
            toast.error('Could not authenticate with project instance, please rebuild project or contact support.')
            return
        }
        const token = result.token
        await guestClient.authenticateWithToken(token!)
        toast.success('Authenticated')
        setMessage('Redirecting...')
        navigate(`/${instance.name}/dashboard/builder`)
    }

    useEffect(() => {
        setMessage('Loading instance')
        if (!instance) {
            console.log('still loading')
        } else {
            switch (instance.deploymentStatus) {
                case DeploymentStatus.DESTROYED:
                case DeploymentStatus.PENDING_DESTROY:
                    toast.error('Instance is destroyed')
                    navigate('/cloud/instances')
                    break
                case DeploymentStatus.PENDING_DEPLOY:
                case DeploymentStatus.DEPLOYED:
                    handleInstance(instance)
                    break
                default:
                    toast.error('Instance deployment failed, please contact support: contact@apibrew.io')
                    navigate('/cloud/instances')
                    break
            }
        }
    }, [instance]);

    return <>
        <Alert severity="info">{message}</Alert>
        <LoadingOverlay/>
    </>
}
