/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $APIErrorObject = {
    properties: {
        code: {
    type: 'number',
    isRequired: true,
},
        name: {
    type: 'string',
    isRequired: true,
},
        message: {
    type: 'string',
},
        data: {
    properties: {
    },
},
    },
} as const;
