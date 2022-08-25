/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $UploadOpts = {
    properties: {
        formatPatterns: {
    type: 'FormatPatterns',
},
        externalRefPatterns: {
    type: 'array',
    contains: {
        type: 'FormatPattern',
    },
},
    },
} as const;
