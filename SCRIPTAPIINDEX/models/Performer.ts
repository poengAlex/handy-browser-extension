/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PerformerMetadata } from './PerformerMetadata';
import type { ULID } from './ULID';

export type Performer = {
    performerId: ULID;
    name: string;
    description?: string;
    metadata?: PerformerMetadata;
};
