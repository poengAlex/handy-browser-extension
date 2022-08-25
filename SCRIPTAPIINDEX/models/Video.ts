/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Entity } from './Entity';
import type { ULID } from './ULID';
import type { VideoAttributes } from './VideoAttributes';

export type Video = (VideoAttributes & Entity & {
videoId: ULID;
});
