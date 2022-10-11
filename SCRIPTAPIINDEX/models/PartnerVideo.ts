/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Entity } from './Entity';
import type { ExternalId } from './ExternalId';
import type { PartnerVideoAccessType } from './PartnerVideoAccessType';
import type { PartnerVideoScriptAccessIndicator } from './PartnerVideoScriptAccessIndicator';
import type { Performer } from './Performer';
import type { PerformerData } from './PerformerData';
import type { Rating } from './Rating';
import type { ULID } from './ULID';
import type { URL } from './URL';
import type { VideoDescription } from './VideoDescription';
import type { VideoFormat } from './VideoFormat';
import type { VideoTitle } from './VideoTitle';

export type PartnerVideo = (Entity & {
partnerVideoId: ULID;
partnerId: ULID;
partnerName?: string;
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
thumbnail?: string;
gifs?: Array<string>;
videoAccess?: PartnerVideoAccessType;
scriptAccess?: PartnerVideoScriptAccessIndicator;
/**
 * Video views information from/within the partner video site.
 */
views?: number;
/**
 * Video rating information from/within the partner video site.
 */
rating?: Rating;
/**
 * Video upVotes/likes information from/within the partner video site.
 */
upVotes?: number;
/**
 * Video downVotes/dislikes information from/within the partner video site.
 */
downVotes?: number;
/**
 * Performer information from/within the index service.
 */
performers?: Array<Performer>;
/**
 * Performer information from/within the partner video site.
 */
partnerPerformers?: Array<PerformerData>;
});
