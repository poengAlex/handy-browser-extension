/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ErrorObject = {
    properties: {
        name: {
    type: 'string',
    isRequired: true,
},
        message: {
    type: 'string',
    isRequired: true,
},
        code: {
    type: 'one-of',
    contains: [{
    type: 'PartnerErrorCodes',
}, {
    type: 'TokenErrorCodes',
}],
    isRequired: true,
},
        data: {
    properties: {
    },
},
    },
} as const;
