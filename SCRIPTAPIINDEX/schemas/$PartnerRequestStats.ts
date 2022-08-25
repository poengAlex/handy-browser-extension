/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PartnerRequestStats = {
    properties: {
        from: {
    type: 'DateTime',
},
        to: {
    type: 'DateTime',
},
        partnerId: {
    type: 'ULID',
},
        data: {
    type: 'array',
    contains: {
    properties: {
        time: {
    type: 'string',
    isRequired: true,
},
        count: {
    type: 'number',
    isRequired: true,
},
    },
},
},
    },
} as const;
