/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PartnerRequiredProperties = {
    type: 'all-of',
    contains: [{
    type: 'PartnerAttributes',
}, {
    properties: {
        userId: {
    type: 'ULID',
    isRequired: true,
},
    },
}, {
    properties: {
        name: {
    type: 'string',
    isRequired: true,
},
    },
}],
} as const;
