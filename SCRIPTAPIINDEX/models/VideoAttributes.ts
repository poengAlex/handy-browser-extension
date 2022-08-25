/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ULID } from './ULID';
import type { VideoHash } from './VideoHash';

export type VideoAttributes = {
    fileName: string;
    title?: string;
    description?: string;
    hash: VideoHash;
    partnerId: ULID;
    metadata?: any;
};
