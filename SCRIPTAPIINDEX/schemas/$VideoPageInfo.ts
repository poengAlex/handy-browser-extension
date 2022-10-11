/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $VideoPageInfo = {
    properties: {
        performers: {
    type: 'array',
    contains: {
        type: 'PerformerData',
    },
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
        formats: {
    type: 'array',
    contains: {
    type: 'string',
},
},
        title: {
    type: 'string',
},
        description: {
    type: 'string',
},
        thumbnail: {
    type: 'string',
},
        embedUrl: {
    type: 'string',
},
        encodingFormat: {
    type: 'string',
},
        duration: {
    type: 'string',
},
        height: {
    type: 'string',
},
        width: {
    type: 'string',
},
        interactionCount: {
    type: 'string',
},
        bitrate: {
    type: 'string',
},
        contentSize: {
    type: 'string',
},
        uploadDate: {
    type: 'string',
},
        isFamilyFriendly: {
    type: 'string',
},
        director: {
    type: 'string',
},
        views: {
    type: 'number',
},
        rating: {
    type: 'string',
},
        commentCount: {
    type: 'number',
},
    },
} as const;
