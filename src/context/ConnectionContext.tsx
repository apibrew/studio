import {Connection} from "../connection-provider";
import React, {createContext} from "react";

export const ConnectionContext = createContext<Connection | undefined>(undefined);

export function useConnection() {
    const connection = React.useContext(ConnectionContext);

    if (!connection) {
        throw new Error('useConnection must be used within a ConnectionProvider');
    }

    return connection;
}
