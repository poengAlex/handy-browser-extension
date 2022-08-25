/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $TaskResources = {
    properties: {
        videos: {
    type: 'array',
    contains: {
        type: 'ResourceInfo',
    },
},
        scripts: {
    type: 'array',
    contains: {
        type: 'ResourceInfo',
    },
    isRequired: true,
},
        screenshots: {
    type: 'array',
    contains: {
        type: 'ResourceInfo',
    },
},
        gifs: {
    type: 'array',
    contains: {
        type: 'ResourceInfo',
    },
},
    },
} as const;
