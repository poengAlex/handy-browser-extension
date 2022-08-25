/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Entity } from './Entity';
import type { ScriptContentAttributes } from './ScriptContentAttributes';
import type { ULID } from './ULID';

export type ScriptContent = (ScriptContentAttributes & Entity & {
contentId: ULID;
});
