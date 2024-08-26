import {useStateContext} from "../../context/StateContext.tsx";
import {Settings} from "../../model/settings.ts";

export function GeneralSettingsPage() {
    const [settings, _] = useStateContext<Settings>()

    return <div>
        {settings.name}
    </div>
}
