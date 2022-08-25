/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Scripter } from './Scripter';
import type { ULID } from './ULID';

export type Script = {
    scriptId: ULID;
    scripter?: Scripter;
    tags?: Array<string>;
};
