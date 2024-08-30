import {createContext, useContext} from "react";
import {Account} from "../cloud/model/account.ts";

export const CurrentAccountContext = createContext<Account | undefined>(undefined)

export function useCurrentAccount(): Account | undefined {
    return useContext(CurrentAccountContext)
}
