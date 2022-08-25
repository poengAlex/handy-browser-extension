/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Priority } from './Priority';
import type { ProgressPercent } from './ProgressPercent';
import type { TaskStatus } from './TaskStatus';

export type ScriptingTaskAttributes = {
    status?: TaskStatus;
    priority?: Priority;
    progress?: ProgressPercent;
};
