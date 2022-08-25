/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Entity } from './Entity';
import type { TagAttributes } from './TagAttributes';

export type Tag = (TagAttributes & Entity & {
count?: number;
});
