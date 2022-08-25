/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Entity } from './Entity';
import type { QueueItemRequiredAttributes } from './QueueItemRequiredAttributes';
import type { ScriptingTask } from './ScriptingTask';

export type QueueItem = (QueueItemRequiredAttributes & Entity & {
task?: ScriptingTask;
});
