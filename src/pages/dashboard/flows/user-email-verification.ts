import {
    ActionParams,
    ApiLoadParams,
    ApiSaveParams,
    AssignParams,
    CodeParams,
    ConditionParams,
    EventParams,
    FailParams,
    FunctionCallParams,
    GroupParams,
    Kind,
    Statement
} from "../../../model/flow";

export const UserEmailVerification: Statement[] = [
    {
        kind: Kind.GROUP,
        params: {
            name: 'PreVerification',
            statements: [
                {
                    kind: Kind.EVENT,
                    params: {
                        type: 'Profile',
                        action: 'CREATE',
                        sync: true,
                        order: 'BEFORE'
                    } as EventParams
                },
                {
                    kind: Kind.ASSIGN,
                    params: {
                        left: '$profile.verified',
                        expression: 'false'
                    } as AssignParams
                },
                {
                    kind: Kind.CODE,
                    params: {
                        content: 'const code = Math.random().toString(36).substring(2, 6).toUpperCase();',
                    } as CodeParams
                },
                {
                    kind: Kind.API_CREATE,
                    params: {
                        type: 'UserVerificationCode',
                        payload: {
                            code: '$code',
                            profile: '$profile',
                            expiry: 'new Date(new Date().getTime() + 5 * 60000)'
                        }
                    } as ApiSaveParams
                },
                {
                    kind: Kind.FUNCTION_CALL,
                    params: {
                        name: 'sendMail',
                        params: {
                            to: '$profile.email',
                            subject: 'Verify your email',
                            body: 'Click here to verify your email: https://example.com/verify?code=$code'
                        }
                    } as FunctionCallParams
                },
                {
                    kind: Kind.END,
                    params: {},
                },
            ],
        } as GroupParams
    },
    {
        kind: Kind.GROUP,
        params: {
            name: 'PostVerification',
            statements: [
                {
                    kind: Kind.ACTION,
                    params: {
                        type: 'UserVerification',
                    } as ActionParams
                },
                {
                    kind: Kind.API_LOAD,
                    params: {
                        type: 'UserVerificationCode',
                        match: {
                            code: '$code'
                        },
                    } as ApiLoadParams,
                    variable: 'verification',
                    checkResult: true
                },
                {
                    kind: Kind.CONDITION,
                    params: {
                        condition: '$verification.expiry < new Date()',
                    } as ConditionParams,
                    pass: [
                        {
                            kind: Kind.API_LOAD,
                            params: {
                                type: 'Profile',
                                match: '$verification.profile' as any,
                            } as ApiLoadParams,
                            variable: 'profile',
                            checkResult: true
                        },
                        {
                            kind: Kind.ASSIGN,
                            params: {
                                left: '$profile.verified',
                                expression: 'true'
                            } as AssignParams
                        },
                        {
                            kind: Kind.API_UPDATE,
                            params: {
                                type: 'Profile',
                                payload: '$profile' as any
                            } as ApiSaveParams
                        }
                    ],
                    fail: [
                        {
                            kind: Kind.FAIL,
                            params: {
                                message: 'Verification code expired'
                            } as FailParams
                        }
                    ],
                },
                {
                    kind: Kind.END,
                    params: {},
                }
            ],
        } as GroupParams
    },
    {
        kind: Kind.GROUP,
        params: {
            name: 'PostVerification',
            statements: [
                {
                    kind: Kind.ACTION,
                    params: {
                        type: 'UserVerification',
                    } as ActionParams
                },
                {
                    kind: Kind.API_LOAD,
                    params: {
                        type: 'UserVerificationCode',
                        match: {
                            code: '$code'
                        },
                    } as ApiLoadParams,
                    variable: 'verification',
                    checkResult: true
                },
                {
                    kind: Kind.CONDITION,
                    params: {
                        condition: '$verification.expiry < new Date()',
                    } as ConditionParams,
                    pass: [
                        {
                            kind: Kind.API_LOAD,
                            params: {
                                type: 'Profile',
                                match: '$verification.profile' as any,
                            } as ApiLoadParams,
                            variable: 'profile',
                            checkResult: true
                        },
                        {
                            kind: Kind.ASSIGN,
                            params: {
                                left: '$profile.verified',
                                expression: 'true'
                            } as AssignParams
                        },
                        {
                            kind: Kind.API_UPDATE,
                            params: {
                                type: 'Profile',
                                payload: '$profile' as any
                            } as ApiSaveParams
                        }
                    ],
                    fail: [
                        {
                            kind: Kind.FAIL,
                            params: {
                                message: 'Verification code expired'
                            } as FailParams
                        }
                    ],
                },
                {
                    kind: Kind.END,
                    params: {},
                }
            ],
        } as GroupParams
    },
    {
        kind: Kind.GROUP,
        params: {
            name: 'PostVerification',
            statements: [
                {
                    kind: Kind.ACTION,
                    params: {
                        type: 'UserVerification',
                    } as ActionParams
                },
                {
                    kind: Kind.API_LOAD,
                    params: {
                        type: 'UserVerificationCode',
                        match: {
                            code: '$code'
                        },
                    } as ApiLoadParams,
                    variable: 'verification',
                    checkResult: true
                },
                {
                    kind: Kind.CONDITION,
                    params: {
                        condition: '$verification.expiry < new Date()',
                    } as ConditionParams,
                    pass: [
                        {
                            kind: Kind.API_LOAD,
                            params: {
                                type: 'Profile',
                                match: '$verification.profile' as any,
                            } as ApiLoadParams,
                            variable: 'profile',
                            checkResult: true
                        },
                        {
                            kind: Kind.ASSIGN,
                            params: {
                                left: '$profile.verified',
                                expression: 'true'
                            } as AssignParams
                        },
                        {
                            kind: Kind.API_UPDATE,
                            params: {
                                type: 'Profile',
                                payload: '$profile' as any
                            } as ApiSaveParams
                        }
                    ],
                    fail: [
                        {
                            kind: Kind.FAIL,
                            params: {
                                message: 'Verification code expired'
                            } as FailParams
                        }
                    ],
                },
                {
                    kind: Kind.END,
                    params: {},
                }
            ],
        } as GroupParams
    },
    {
        kind: Kind.GROUP,
        params: {
            name: 'PostVerification',
            statements: [
                {
                    kind: Kind.ACTION,
                    params: {
                        type: 'UserVerification',
                    } as ActionParams
                },
                {
                    kind: Kind.API_LOAD,
                    params: {
                        type: 'UserVerificationCode',
                        match: {
                            code: '$code'
                        },
                    } as ApiLoadParams,
                    variable: 'verification',
                    checkResult: true
                },
                {
                    kind: Kind.CONDITION,
                    params: {
                        condition: '$verification.expiry < new Date()',
                    } as ConditionParams,
                    pass: [
                        {
                            kind: Kind.API_LOAD,
                            params: {
                                type: 'Profile',
                                match: '$verification.profile' as any,
                            } as ApiLoadParams,
                            variable: 'profile',
                            checkResult: true
                        },
                        {
                            kind: Kind.ASSIGN,
                            params: {
                                left: '$profile.verified',
                                expression: 'true'
                            } as AssignParams
                        },
                        {
                            kind: Kind.API_UPDATE,
                            params: {
                                type: 'Profile',
                                payload: '$profile' as any
                            } as ApiSaveParams
                        }
                    ],
                    fail: [
                        {
                            kind: Kind.FAIL,
                            params: {
                                message: 'Verification code expired'
                            } as FailParams
                        }
                    ],
                },
                {
                    kind: Kind.END,
                    params: {},
                }
            ],
        } as GroupParams
    },
] as Statement[]