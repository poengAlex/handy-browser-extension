/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Priority } from './Priority';
import type { ProgressPercent } from './ProgressPercent';
import type { ScriptingTaskAttributes } from './ScriptingTaskAttributes';
import type { TaskStatus } from './TaskStatus';

export type ScriptingTaskRequiredAttributes = (ScriptingTaskAttributes & {
status: TaskStatus;
priority: Priority;
progress: ProgressPercent;
});
