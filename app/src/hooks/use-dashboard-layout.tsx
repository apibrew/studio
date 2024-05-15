import {DashboardLayoutConfig, DashboardLayoutConfigureContext} from "../context/DashboardLayoutConfig";
import {useContext, useEffect} from "react";
import {deepEqual} from "../util/object";

export function useDashboardLayout(config: Partial<DashboardLayoutConfig>) {
    const context = useContext(DashboardLayoutConfigureContext);

    const currentProps = context.get()

    const newProps = {
        ...currentProps,
        ...config
    }

    useEffect(() => {
        if (deepEqual(currentProps, newProps)) {
            return
        }

        context.update({
            ...currentProps,
            ...config
        })
    }, [currentProps, newProps]);
}
