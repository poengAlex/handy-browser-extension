/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $TagContextAttributes = {
    properties: {
        tagId: {
    type: 'TagId',
    isRequired: true,
},
        contextId: {
    type: 'ULID',
    isRequired: true,
},
        contextType: {
    type: 'ContextType',
    isRequired: true,
},
    },
} as const;
