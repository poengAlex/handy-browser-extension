/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Entity } from './Entity';
import type { PartnerTaskAttributes } from './PartnerTaskAttributes';
import type { PartnerVideo } from './PartnerVideo';
import type { Scripter } from './Scripter';
import type { ULID } from './ULID';

export type ScriptingTask = (PartnerTaskAttributes & Entity & {
taskId: ULID;
scripterId?: ULID;
scripter?: Scripter;
video?: PartnerVideo;
});
