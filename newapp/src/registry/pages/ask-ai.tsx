import {registerPageType} from "core";
import {AskAi} from "ask-ai";
import {useRecordByName} from "@apibrew/react";
import {Instance, InstanceEntityInfo} from "../../cloud/model/instance.ts";
import {LoadingOverlay} from "common";
import {withHostClient} from "../../hooks/with-host-client.tsx";
import {useConnection} from "../../dashboard/context/ConnectionContext.tsx";

export function AskAiPage() {
    const connection = useConnection()

    const instance = useRecordByName<Instance>(InstanceEntityInfo, connection.name)

    if (!instance) {
        return <LoadingOverlay/>
    }

    return <>
        <AskAi instance={instance}/>
    </>
}

registerPageType('Ask AI', 'ask-ai', withHostClient(AskAiPage))
