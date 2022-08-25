/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ScriptToken = {
    type: 'all-of',
    description: `A script token contains the information required to access and play a script.`,
    contains: [{
    type: 'ScriptTokenAttributes',
}, {
    type: 'Entity',
}, {
    properties: {
        tokenId: {
    type: 'ULID',
    isRequired: true,
},
    },
}],
} as const;
