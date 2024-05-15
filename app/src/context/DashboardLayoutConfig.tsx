import {createContext} from "react";

export interface DashboardLayoutConfig {
}

export interface DashboardLayoutConfigureContextProps {
    get(): DashboardLayoutConfig;

    update(config: Partial<DashboardLayoutConfig>): void;
}

export const DashboardLayoutConfigureContext = createContext<DashboardLayoutConfigureContextProps>({} as DashboardLayoutConfigureContextProps);

