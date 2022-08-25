/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $QueueItem = {
    type: 'all-of',
    contains: [{
    type: 'QueueItemRequiredAttributes',
}, {
    type: 'Entity',
}, {
    properties: {
        task: {
    type: 'ScriptingTask',
},
    },
}],
} as const;
