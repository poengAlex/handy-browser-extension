/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ScriptContentAttributes = {
    type: 'all-of',
    contains: [{
    type: 'ContentAttributes',
}, {
    properties: {
        scriptId: {
    type: 'ULID',
    isRequired: true,
},
    },
}],
} as const;
