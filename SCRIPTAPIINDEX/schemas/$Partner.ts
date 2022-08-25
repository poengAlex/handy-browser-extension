/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Partner = {
    properties: {
        partnerId: {
    type: 'ULID',
    isRequired: true,
},
        name: {
    type: 'string',
    isRequired: true,
},
        description: {
    type: 'string',
},
        tags: {
    type: 'array',
    contains: {
    type: 'string',
},
},
    },
} as const;
