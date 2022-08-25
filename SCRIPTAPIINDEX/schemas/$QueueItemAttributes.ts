/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $QueueItemAttributes = {
    properties: {
        status: {
    type: 'QueueItemStatus',
    isRequired: true,
},
        priority: {
    type: 'number',
    isRequired: true,
},
    },
} as const;
