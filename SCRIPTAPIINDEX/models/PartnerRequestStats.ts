/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DateTime } from './DateTime';
import type { ULID } from './ULID';

export type PartnerRequestStats = {
    from?: DateTime;
    to?: DateTime;
    partnerId?: ULID;
    data?: Array<{
time: string;
count: number;
}>;
};
