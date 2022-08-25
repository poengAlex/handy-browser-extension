/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ScriptStatus } from './ScriptStatus';
import type { ScriptType } from './ScriptType';
import type { ULID } from './ULID';

export type ScriptAttributes = {
    name?: string;
    description?: string;
    type?: ScriptType;
    scripterId?: ULID;
    videoId?: ULID;
    status?: ScriptStatus;
};
