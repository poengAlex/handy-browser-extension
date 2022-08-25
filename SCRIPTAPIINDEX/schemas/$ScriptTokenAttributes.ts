/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ScriptTokenAttributes = {
    description: `The attributes describing a script token.`,
    properties: {
        partnerId: {
    type: 'ULID',
    isRequired: true,
},
        partnerVideoId: {
    type: 'ULID',
    isRequired: true,
},
        expiresAt: {
    type: 'ExpirationTime',
},
        status: {
    type: 'ScriptTokenStatus',
},
    },
} as const;
