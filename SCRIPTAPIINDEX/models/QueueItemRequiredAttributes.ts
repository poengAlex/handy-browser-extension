/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { QueueItemStatus } from './QueueItemStatus';
import type { ULID } from './ULID';

export type QueueItemRequiredAttributes = {
    status: QueueItemStatus;
    priority: number;
    taskId: ULID;
};
