/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $VideoRequest = {
    type: 'all-of',
    contains: [{
    type: 'Entity',
}, {
    properties: {
        requestId: {
    type: 'ULID',
    isRequired: true,
},
        url: {
    type: 'URL',
    isRequired: true,
},
        externalRef: {
    type: 'string',
},
        domain: {
    type: 'string',
    isRequired: true,
},
        status: {
    type: 'VideoRequestStatus',
    isRequired: true,
},
        votes: {
    type: 'number',
    isRequired: true,
},
    },
}],
} as const;
