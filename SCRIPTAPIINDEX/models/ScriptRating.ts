/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Entity } from './Entity';
import type { NewScriptRating } from './NewScriptRating';
import type { ULID } from './ULID';

export type ScriptRating = (NewScriptRating & Entity & {
ratingId: ULID;
});
