/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Rating } from './Rating';
import type { Scripter } from './Scripter';
import type { ScriptMetadata } from './ScriptMetadata';
import type { ULID } from './ULID';

export type Script = {
    scriptId: ULID;
    scripter?: Scripter;
    tags?: Array<string>;
    rating?: Rating;
    metadata?: ScriptMetadata;
};
