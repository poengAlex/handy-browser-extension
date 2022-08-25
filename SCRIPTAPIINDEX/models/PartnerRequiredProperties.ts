/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PartnerAttributes } from './PartnerAttributes';
import type { ULID } from './ULID';

export type PartnerRequiredProperties = (PartnerAttributes & {
userId: ULID;
} & {
name: string;
});
