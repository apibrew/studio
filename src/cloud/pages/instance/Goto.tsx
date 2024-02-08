import {LoadingOverlay} from "../../../components/LoadingOverlay";
import {useNavigate, useParams} from "react-router-dom";
import {LocalStorageTokenStorage, useClient, useRecordBy} from "@apibrew/react";
import {DeploymentStatus, Instance, InstanceEntityInfo} from "../../model/instance";
import React, {useEffect} from "react";
import toast from "react-hot-toast";
import {Client, ClientImpl} from "@apibrew/client";
import Alert from "@mui/material/Alert";

export function Goto() {
    const params = useParams()
    const navigate = useNavigate()
    const hostClient = useClient()
    const [message, setMessage] = React.useState('')

    const instance = useRecordBy<Instance>(InstanceEntityInfo, {
        id: params.id
    })

    async function awaitInstance(guestClient: Client, tokenStorage: LocalStorageTokenStorage) {
        for (let i = 0; i < 20; i++) {
            try {
                await guestClient.listResources()
                break
            } catch (e: any) {
                if (e.code === 'AUTHENTICATION_FAILED') {
                    tokenStorage.clear()
                    continue
                }
                console.error(e)
                await new Promise(resolve => setTimeout(resolve, 5000))
            } finally {
                setMessage('Awaiting instance... ' + i + '/20')
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

        const prem = toast.loading('Authenticating...')
        hostClient.listRecords<Instance>(InstanceEntityInfo, {
            filters: {
                name: instance.name
            }
        }).then(async (resp) => {
            toast.dismiss(prem)
            if (resp.content[0].controllerAccessToken) {
                console.log('reps', resp)

                await awaitInstance(guestClient, tokenStorage)

                setMessage('Authenticating...')
                await guestClient.authenticateWithToken(resp.content[0].controllerAccessToken!)
                toast.success('Authenticated')
                setMessage('Redirecting...')

                navigate(`/${instance.name}/dashboard`)
            } else {
                if (!retry) {
                    await handleInstance(instance, true)
                }
            }
        }, err => {
            console.error(err)
            toast.success('Could not authenticate with project instance, please rebuild project or contact support.')
        })
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