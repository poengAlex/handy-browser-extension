/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ScriptingTask = {
    type: 'all-of',
    contains: [{
    type: 'PartnerTaskAttributes',
}, {
    type: 'Entity',
}, {
    properties: {
        taskId: {
    type: 'ULID',
    isRequired: true,
},
        scripterId: {
    type: 'ULID',
},
        scripter: {
    type: 'Scripter',
},
        video: {
    type: 'PartnerVideo',
},
    },
}],
} as const;
