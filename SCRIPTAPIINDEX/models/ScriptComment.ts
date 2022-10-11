/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Entity } from './Entity';
import type { NewScriptComment } from './NewScriptComment';
import type { ScriptCommentStatus } from './ScriptCommentStatus';
import type { ULID } from './ULID';

export type ScriptComment = (NewScriptComment & Entity & {
commentId: ULID;
status?: ScriptCommentStatus;
});
