import {useNavigate, useParams} from "react-router-dom";
import {LocalStorageTokenStorage} from "@apibrew/react";
import {DeploymentStatus, Instance, InstanceEntityInfo} from "../model/instance";
import {useEffect, useState} from "react";
import toast from "react-hot-toast";
import {Client, ClientImpl} from "@apibrew/client";
import {ControllerAccessToken, ControllerAccessTokenEntityInfo} from "../model/ops/controller-access-token";
import {useHostClient} from "../../hooks/use-host-client.tsx";
import {LoadingOverlay} from "common";

export function Goto() {
    const params = useParams()
    const client = useHostClient()
    const navigate = useNavigate()
    const [message, setMessage] = useState('')
    const controllerAccessTokenRepository = client.repo<ControllerAccessToken>(ControllerAccessTokenEntityInfo)
    const [stage, setStage] = useState(0)
    const [tryCount, setTryCount] = useState(0)
    const [instance, setInstance] = useState<Instance>()

    useEffect(() => {
        client.loadRecord<Instance>(InstanceEntityInfo, {
            id: params.id
        }).then(setInstance)
    }, [params.id]);

    async function awaitInstance(guestClient: Client, tokenStorage: LocalStorageTokenStorage) {
        for (let i = 0; i < 10; i++) {
            try {
                await guestClient.listResources()
                break
            } catch (e: any) {
                if (e.code === 'AUTHENTICATION_FAILED') {
                    tokenStorage.clear()
                    continue
                }
                console.error(e)
                await new Promise(resolve => setTimeout(resolve, 2000))
            } finally {
                setTryCount(i)
            }
        }
    }

    async function handleInstance(instance: Instance, retry?: boolean) {
        if (retry) {
            setMessage('Awaiting instance[retry]...')
        }

        const guestClient = new ClientImpl(`https://${instance.name}.apibrew.io`)
        const tokenStorage = new LocalStorageTokenStorage(instance.name)
        guestClient.useTokenStorage(tokenStorage)

        const prem = toast.loading('Loading Instance...')

        await awaitInstance(guestClient, tokenStorage)

        setStage(2)

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

        setStage(3)
        const token = result.token
        await guestClient.authenticateWithToken(token!)
        toast.success('Authenticated')
        setMessage('Redirecting...')
        navigate(`/${instance.name}/dashboard`)
    }

    useEffect(() => {
        setMessage('Loading instance')
        if (!instance) {
            console.log('still loading')
        } else {
            setStage(1)
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
        <div className="row1_3-steps flex-center">
            <span className="r1-3-sp1"></span>
            <div className={`r1-3-div1 ${stage == 0 && 'redy'} ${stage > 0 && 'redy'}`}>
            <span className="r1-3-d1-sp1-A">
                <span>1</span>&nbsp;
            </span>
                <span className="r1-3-d1-sp1-R">
                <span><img src="/done_black.png" alt="png"/></span>
                    &nbsp;&nbsp;
            </span>

                <div className="r1-3-div2">
                    Preparing User Data
                </div>

            </div>

            <hr/>

            <div className={`r1-3-div1 ${stage == 1 && 'active'} ${stage > 1 && 'redy'}`}>

            <span className="r1-3-d1-sp1-N">
                &nbsp;&nbsp;
                <span>2</span>
                &nbsp;&nbsp;
            </span>
                <span className="r1-3-d1-sp1-A">
                &nbsp;<span>2</span>&nbsp;
            </span>
                <span className="r1-3-d1-sp1-R">
                &nbsp;&nbsp;
                    <span><img src="/done_black.png" alt="png"/></span>
                    &nbsp;&nbsp;
            </span>

                <div className="r1-3-div2">
                    Building Project
                </div>

            </div>

            <hr/>

            <div className={`r1-3-div1 ${stage == 2 && 'active'} ${stage > 2 && 'redy'}`}>

            <span className="r1-3-d1-sp1-N">
                &nbsp;&nbsp;
                <span>3</span>
                &nbsp;&nbsp;
            </span>
                <span className="r1-3-d1-sp1-A">
                &nbsp;<span>3</span>&nbsp;
            </span>
                <span className="r1-3-d1-sp1-R">
                &nbsp;&nbsp;
                    <span><img src="/done_black.png" alt="png"/></span>
                    &nbsp;&nbsp;
            </span>

                <div className="r1-3-div2">
                    Awaiting for Project to be ready {tryCount > 10 && <span>({tryCount - 10}/10)</span>}
                </div>

            </div>

            <hr/>

            <div className={`r1-3-div1 ${stage == 3 && 'active'} ${stage > 3 && 'redy'}`}>

            <span className="r1-3-d1-sp1-N">
                &nbsp;&nbsp;
                <span>4</span>
            </span>
                <span className="r1-3-d1-sp1-A">
                &nbsp;<span>4</span>
            </span>
                <span className="r1-3-d1-sp1-R">
                &nbsp;&nbsp;
                    <span><img src="/done_black.png" alt="png"/></span>
            </span>

                <div className="r1-3-div2">
                    Finishing up {stage == 3 && <span>{message}</span>}
                </div>

            </div>

            <span className="r1-3-sp1"></span>
        </div>
        <LoadingOverlay/>
    </>
}
