/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Entity } from './Entity';
import type { ScriptTokenAttributes } from './ScriptTokenAttributes';
import type { ULID } from './ULID';

/**
 * A script token contains the information required to access and play a script.
 */
export type ScriptToken = (ScriptTokenAttributes & Entity & {
tokenId: ULID;
});
