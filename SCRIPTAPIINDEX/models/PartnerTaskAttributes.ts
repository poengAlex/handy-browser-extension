/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ScriptingTaskAttributes } from './ScriptingTaskAttributes';
import type { ULID } from './ULID';

export type PartnerTaskAttributes = (ScriptingTaskAttributes & {
partnerVideoId: ULID;
});
