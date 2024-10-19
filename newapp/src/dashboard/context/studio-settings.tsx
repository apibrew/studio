import {createContext, useContext} from "react";
import {Settings} from "../model/settings.ts";

export const StudioSettingsContext = createContext<Settings | undefined>(undefined)

export function useStudioSettings(): Settings {
    const settings = useContext(StudioSettingsContext)

    if (!settings) {
        throw new Error('useStudioSettings must be used within a StudioSettingsProvider')
    }

    return settings
}

