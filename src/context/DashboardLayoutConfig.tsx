import React from "react";

export interface DashboardLayoutConfig {
}

export interface DashboardLayoutConfigureContextProps {
    get(): DashboardLayoutConfig;

    update(config: Partial<DashboardLayoutConfig>): void;
}

export const DashboardLayoutConfigureContext = React.createContext<DashboardLayoutConfigureContextProps>({} as DashboardLayoutConfigureContextProps);

