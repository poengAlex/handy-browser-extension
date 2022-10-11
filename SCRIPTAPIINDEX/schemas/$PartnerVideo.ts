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
        thumbnail: {
    type: 'string',
},
        gifs: {
    type: 'array',
    contains: {
    type: 'string',
},
},
        videoAccess: {
    type: 'PartnerVideoAccessType',
},
        scriptAccess: {
    type: 'PartnerVideoScriptAccessIndicator',
},
        views: {
    type: 'number',
    description: `Video views information from/within the partner video site.`,
},
        rating: {
    type: 'Rating',
    description: `Video rating information from/within the partner video site.`,
},
        upVotes: {
    type: 'number',
    description: `Video upVotes/likes information from/within the partner video site.`,
},
        downVotes: {
    type: 'number',
    description: `Video downVotes/dislikes information from/within the partner video site.`,
},
        performers: {
    type: 'array',
    contains: {
        type: 'Performer',
    },
},
        partnerPerformers: {
    type: 'array',
    contains: {
        type: 'PerformerData',
    },
},
    },
}],
} as const;
