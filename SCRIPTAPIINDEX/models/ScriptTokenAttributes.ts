/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ExpirationTime } from './ExpirationTime';
import type { ScriptTokenStatus } from './ScriptTokenStatus';
import type { ULID } from './ULID';

/**
 * The attributes describing a script token.
 */
export type ScriptTokenAttributes = {
    partnerId: ULID;
    partnerVideoId: ULID;
    expiresAt?: ExpirationTime;
    status?: ScriptTokenStatus;
};
