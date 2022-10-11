/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Rating } from './Rating';
import type { ScriptAccessType } from './ScriptAccessType';
import type { Scripter } from './Scripter';
import type { ScriptMetadata } from './ScriptMetadata';
import type { ULID } from './ULID';

export type Script = {
    scriptId: ULID;
    scripter?: Scripter;
    tags?: Array<string>;
    rating?: Rating;
    metadata?: ScriptMetadata;
    access?: ScriptAccessType;
};
