/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $VideoRequestVote = {
    type: 'all-of',
    contains: [{
    type: 'Entity',
}, {
    properties: {
        voteId: {
    type: 'ULID',
    isRequired: true,
},
        requestId: {
    type: 'ULID',
    isRequired: true,
},
        vote: {
    type: 'VideoRequestVoteValue',
    isRequired: true,
},
    },
}],
} as const;
