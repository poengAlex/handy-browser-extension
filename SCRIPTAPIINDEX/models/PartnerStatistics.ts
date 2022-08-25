/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DateTime } from './DateTime';

export type PartnerStatistics = {
    from?: DateTime;
    to?: DateTime;
    uploadCount?: number;
    videoCount?: number;
    playCount?: number;
    userCount?: number;
    tokenCount?: number;
};
