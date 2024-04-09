import {ActionParams, ApiSaveParams, Kind, Statement} from "../../../model/flow";

export const UserRegistrationExampleStatements: Statement[] = [
    {
        kind: Kind.ACTION,
        params: {
            type: 'UserRegistration',
        } as ActionParams
    },
    {
        kind: Kind.API_CREATE,
        params: {
            type: 'system/User',
            payload: {
                username: '$username',
                password: '$password',
                roles: [{
                    name: 'CUSTOMER'
                }]
            }
        } as ApiSaveParams,
        variable: 'user',
    },
    {
        kind: Kind.API_CREATE,
        params: {
            type: 'Profile',
            payload: {
                username: '$username',
                roles: [{
                    name: 'CUSTOMER'
                }]
            }
        } as ApiSaveParams
    },
    {
        kind: Kind.END,
        params: {},
    }
] as Statement[]