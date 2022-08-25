/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PartnerErrorCodes } from './PartnerErrorCodes';
import type { TokenErrorCodes } from './TokenErrorCodes';

export type ErrorObject = {
    name: string;
    message: string;
    code: (PartnerErrorCodes | TokenErrorCodes);
    data?: any;
};
