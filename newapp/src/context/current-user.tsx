import {User} from "@apibrew/client/model";
import {createContext, useContext} from "react";

export const CurrentUserContext = createContext<User | undefined>(undefined)

export function useCurrentUser(): User | undefined {
    return useContext(CurrentUserContext)
}

export function getUserDisplayName(user?: User): string {
    if (!user) {
        return "User"
    }

    if (user.details && (user.details as any).name) {
        return (user.details as any).name
    }

    return user.username
}
