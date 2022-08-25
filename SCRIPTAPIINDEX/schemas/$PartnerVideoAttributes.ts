/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PartnerVideoAttributes = {
    properties: {
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
        status: {
    type: 'PartnerVideoStatus',
},
    },
} as const;
