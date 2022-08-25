/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PartnerSettings = {
    properties: {
        upload: {
    type: 'UploadOpts',
    isRequired: true,
},
        download: {
    type: 'DownloadOpts',
    isRequired: true,
},
        token: {
    type: 'TokenSettings',
    isRequired: true,
},
        video: {
    type: 'FormatOpts',
},
        messages: {
    type: 'PartnerMessages',
},
    },
} as const;
