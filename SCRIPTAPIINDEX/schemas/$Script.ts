/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Script = {
    properties: {
        scriptId: {
    type: 'ULID',
    isRequired: true,
},
        scripter: {
    type: 'Scripter',
},
        tags: {
    type: 'array',
    contains: {
    type: 'string',
},
},
    },
} as const;
