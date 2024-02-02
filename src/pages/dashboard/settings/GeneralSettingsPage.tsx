import {useStateContext} from "../../../context/StateContext";
import {Settings} from "../../../model/settings";

export function GeneralSettingsPage() {
    const [settings, setSettings] = useStateContext<Settings>()

    return <div>
        {settings.name}
    </div>
}