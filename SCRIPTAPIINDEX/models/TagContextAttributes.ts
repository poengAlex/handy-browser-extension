/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ContextType } from './ContextType';
import type { TagId } from './TagId';
import type { ULID } from './ULID';

export type TagContextAttributes = {
    tagId: TagId;
    contextId: ULID;
    contextType: ContextType;
};
