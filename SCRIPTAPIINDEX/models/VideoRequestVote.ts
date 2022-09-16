/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Entity } from './Entity';
import type { ULID } from './ULID';
import type { VideoRequestVoteValue } from './VideoRequestVoteValue';

export type VideoRequestVote = (Entity & {
voteId: ULID;
requestId: ULID;
vote: VideoRequestVoteValue;
});
