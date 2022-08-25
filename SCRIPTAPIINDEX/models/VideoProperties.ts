/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Format } from './Format';
import type { Stream } from './Stream';

export type VideoProperties = {
    streams?: Array<Stream>;
    format?: Format;
};
