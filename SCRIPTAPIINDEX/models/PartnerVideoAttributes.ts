/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ExternalId } from './ExternalId';
import type { PartnerVideoStatus } from './PartnerVideoStatus';
import type { URL } from './URL';
import type { VideoDescription } from './VideoDescription';
import type { VideoTitle } from './VideoTitle';

export type PartnerVideoAttributes = {
    title?: VideoTitle;
    description?: VideoDescription;
    externalRef?: ExternalId;
    /**
     * Optional URL to where the video can be found in the partner site.
     */
    videoUrl?: URL;
    status?: PartnerVideoStatus;
};
