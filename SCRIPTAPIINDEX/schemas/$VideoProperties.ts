/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $VideoProperties = {
    properties: {
        streams: {
    type: 'array',
    contains: {
        type: 'Stream',
    },
},
        format: {
    type: 'Format',
},
    },
} as const;
