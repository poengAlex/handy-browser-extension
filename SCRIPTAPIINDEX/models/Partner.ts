/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ULID } from './ULID';

export type Partner = {
    partnerId: ULID;
    name: string;
    description?: string;
    tags?: Array<string>;
};
