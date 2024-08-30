import {createContext, useContext} from "react";
import {Instance} from "../cloud/model/instance.ts";

export const CurrentInstanceContext = createContext<Instance | undefined>(undefined)

export function useCurrentInstance(): Instance | undefined {
    return useContext(CurrentInstanceContext)
}
