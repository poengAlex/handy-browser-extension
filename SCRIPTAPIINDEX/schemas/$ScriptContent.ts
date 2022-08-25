/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ScriptContent = {
    type: 'all-of',
    contains: [{
    type: 'ScriptContentAttributes',
}, {
    type: 'Entity',
}, {
    properties: {
        contentId: {
    type: 'ULID',
    isRequired: true,
},
    },
}],
} as const;
