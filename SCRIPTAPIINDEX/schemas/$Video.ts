/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Video = {
    type: 'all-of',
    contains: [{
    type: 'VideoAttributes',
}, {
    type: 'Entity',
}, {
    properties: {
        videoId: {
    type: 'ULID',
    isRequired: true,
},
    },
}],
} as const;
