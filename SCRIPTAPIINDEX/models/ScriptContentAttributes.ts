/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ContentAttributes } from './ContentAttributes';
import type { ULID } from './ULID';

export type ScriptContentAttributes = (ContentAttributes & {
scriptId: ULID;
});
