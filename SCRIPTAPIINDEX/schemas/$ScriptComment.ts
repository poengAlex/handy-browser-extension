/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ScriptComment = {
    type: 'all-of',
    contains: [{
    type: 'NewScriptComment',
}, {
    type: 'Entity',
}, {
    properties: {
        commentId: {
    type: 'ULID',
    isRequired: true,
},
        status: {
    type: 'ScriptCommentStatus',
},
    },
}],
} as const;
