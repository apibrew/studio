import {LoadingOverlay} from "../../../components/LoadingOverlay";
import {useNavigate, useParams} from "react-router-dom";
import {LocalStorageTokenStorage, useClient, useRecordBy} from "@apibrew/react";
import {DeploymentStatus, Instance, InstanceEntityInfo} from "../../model/instance";
import {useEffect} from "react";
import toast from "react-hot-toast";
import {ClientImpl} from "@apibrew/client";

export function Goto() {
    const params = useParams()
    const navigate = useNavigate()
    const hostClient = useClient()

    const instance = useRecordBy<Instance>(InstanceEntityInfo, {
        id: params.id
    })

    function handleInstance(instance: Instance) {
        const guestClient = new ClientImpl(`https://${instance.name}.apibrew.io:8443`)
        guestClient.useTokenStorage(new LocalStorageTokenStorage(instance.name))

        const prem = toast.loading('Authenticating...')
        hostClient.listRecords<Instance>(InstanceEntityInfo, {
            filters: {
                name: instance.name
            }
        }).then(resp => {
            toast.dismiss(prem)
            if (resp.content[0].controllerAccessToken) {
                console.log('reps', resp)
                guestClient.authenticateWithToken(resp.content[0].controllerAccessToken!)
                toast.success('Authenticated')

                navigate(`/${instance.name}/dashboard`)
            } else {
                toast.error('Could not authenticate with project instance, please rebuild project or contact support.')
            }
        }, err => {
            console.error(err)
            toast.success('Could not authenticate with project instance, please rebuild project or contact support.')
        })
    }

    useEffect(() => {
        if (!instance) {
            console.log('still loading')
        } else {
            switch (instance.deploymentStatus) {
                case DeploymentStatus.DESTROYED:
                case DeploymentStatus.PENDING_DESTROY:
                    toast.error('Instance is destroyed')
                    navigate('/cloud/post-login')
                    break
                case DeploymentStatus.DEPLOYED:
                    handleInstance(instance)
                    break
                default:
                    toast.error('Instance deployment failed, please contact support: contact@apibrew.io')
                    navigate('/cloud/post-login')
                    break
            }
        }
    }, [instance]);

    return <>
        {params.id}
        <LoadingOverlay/>
    </>
}