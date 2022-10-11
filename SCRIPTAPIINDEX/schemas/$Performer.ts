/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $Performer = {
    properties: {
        performerId: {
    type: 'ULID',
    isRequired: true,
},
        name: {
    type: 'string',
    isRequired: true,
},
        description: {
    type: 'string',
},
        metadata: {
    type: 'PerformerMetadata',
},
    },
} as const;
