/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $FormatPatterns = {
    properties: {
        vr: {
    type: 'array',
    contains: {
        type: 'FormatPattern',
    },
},
        flat: {
    type: 'array',
    contains: {
        type: 'FormatPattern',
    },
},
    },
} as const;
