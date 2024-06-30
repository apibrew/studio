import {createContext, useContext} from "react";
import {Connection} from "@apibrew/react";

export const ConnectionContext = createContext<Connection | undefined>(undefined);

export function useConnection() {
    const connection = useContext(ConnectionContext);

    if (!connection) {
        throw new Error('useConnection must be used within a ConnectionProvider');
    }

    return connection;
}
