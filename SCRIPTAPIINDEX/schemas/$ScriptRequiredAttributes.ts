/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ScriptRequiredAttributes = {
    type: 'all-of',
    contains: [{
    type: 'ScriptAttributes',
}, {
    properties: {
        type: {
    type: 'ScriptType',
    isRequired: true,
},
        scripterId: {
    type: 'ULID',
    isRequired: true,
},
        videoId: {
    type: 'ULID',
    isRequired: true,
},
    },
}],
} as const;
