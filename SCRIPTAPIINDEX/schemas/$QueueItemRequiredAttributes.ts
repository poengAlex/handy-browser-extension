/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $QueueItemRequiredAttributes = {
    properties: {
        status: {
    type: 'QueueItemStatus',
    isRequired: true,
},
        priority: {
    type: 'number',
    isRequired: true,
},
        taskId: {
    type: 'ULID',
    isRequired: true,
},
    },
} as const;
