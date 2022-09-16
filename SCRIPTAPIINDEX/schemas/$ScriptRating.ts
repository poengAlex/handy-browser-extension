/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ScriptRating = {
    type: 'all-of',
    contains: [{
    type: 'NewScriptRating',
}, {
    type: 'Entity',
}, {
    properties: {
        ratingId: {
    type: 'ULID',
    isRequired: true,
},
    },
}],
} as const;
