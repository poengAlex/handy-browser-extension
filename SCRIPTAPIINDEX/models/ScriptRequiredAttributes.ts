/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ScriptAttributes } from './ScriptAttributes';
import type { ScriptType } from './ScriptType';
import type { ULID } from './ULID';

export type ScriptRequiredAttributes = (ScriptAttributes & {
type: ScriptType;
scripterId: ULID;
videoId: ULID;
});
