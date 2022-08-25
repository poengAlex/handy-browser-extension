/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { FormatPattern } from './FormatPattern';
import type { FormatPatterns } from './FormatPatterns';

export type UploadOpts = {
    formatPatterns?: FormatPatterns;
    externalRefPatterns?: Array<FormatPattern>;
};
