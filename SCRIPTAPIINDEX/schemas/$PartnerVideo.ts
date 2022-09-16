/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PartnerVideo = {
    type: 'all-of',
    contains: [{
    type: 'Entity',
}, {
    properties: {
        partnerVideoId: {
    type: 'ULID',
    isRequired: true,
},
        partnerId: {
    type: 'ULID',
    isRequired: true,
},
        partnerName: {
    type: 'string',
},
        title: {
    type: 'VideoTitle',
},
        description: {
    type: 'VideoDescription',
},
        externalRef: {
    type: 'ExternalId',
},
        videoUrl: {
    type: 'URL',
    description: `Optional URL to where the video can be found in the partner site.`,
},
        duration: {
    type: 'number',
},
        format: {
    type: 'VideoFormat',
},
        tags: {
    type: 'array',
    contains: {
    type: 'string',
},
},
        images: {
    type: 'array',
    contains: {
    type: 'string',
},
},
        gifs: {
    type: 'array',
    contains: {
    type: 'string',
},
},
        type: {
    type: 'VideoType',
},
    },
}],
} as const;
