/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $VideoAttributes = {
    properties: {
        fileName: {
    type: 'string',
    isRequired: true,
},
        title: {
    type: 'string',
},
        description: {
    type: 'string',
},
        hash: {
    type: 'VideoHash',
    isRequired: true,
},
        partnerId: {
    type: 'ULID',
    isRequired: true,
},
        metadata: {
    properties: {
    },
},
    },
} as const;
