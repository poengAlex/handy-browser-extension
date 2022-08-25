/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ScriptingTaskRequiredAttributes = {
    type: 'all-of',
    contains: [{
    type: 'ScriptingTaskAttributes',
}, {
    properties: {
        status: {
    type: 'TaskStatus',
    isRequired: true,
},
        priority: {
    type: 'Priority',
    isRequired: true,
},
        progress: {
    type: 'ProgressPercent',
    isRequired: true,
},
    },
}],
} as const;
