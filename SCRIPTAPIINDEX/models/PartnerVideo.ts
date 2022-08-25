/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ExternalId } from './ExternalId';
import type { ULID } from './ULID';
import type { URL } from './URL';
import type { VideoDescription } from './VideoDescription';
import type { VideoFormat } from './VideoFormat';
import type { VideoTitle } from './VideoTitle';
import type { VideoType } from './VideoType';

export type PartnerVideo = {
    partnerVideoId: ULID;
    partnerId: ULID;
    title?: VideoTitle;
    description?: VideoDescription;
    externalRef?: ExternalId;
    /**
     * Optional URL to where the video can be found in the partner site.
     */
    videoUrl?: URL;
    duration?: number;
    format?: VideoFormat;
    tags?: Array<string>;
    images?: Array<string>;
    gifs?: Array<string>;
    type?: VideoType;
};
