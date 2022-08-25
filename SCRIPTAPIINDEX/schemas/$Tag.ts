/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Tag = {
    type: 'all-of',
    contains: [{
    type: 'TagAttributes',
}, {
    type: 'Entity',
}, {
    properties: {
        count: {
    type: 'number',
},
    },
}],
} as const;
