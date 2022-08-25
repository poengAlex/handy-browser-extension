/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $PartnerTaskAttributes = {
    type: 'all-of',
    contains: [{
    type: 'ScriptingTaskAttributes',
}, {
    properties: {
        partnerVideoId: {
    type: 'ULID',
    isRequired: true,
},
    },
}],
} as const;
