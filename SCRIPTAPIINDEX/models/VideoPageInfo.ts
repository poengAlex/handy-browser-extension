/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { PerformerData } from './PerformerData';

export type VideoPageInfo = {
    performers?: Array<PerformerData>;
    tags?: Array<string>;
    images?: Array<string>;
    formats?: Array<string>;
    title?: string;
    description?: string;
    thumbnail?: string;
    embedUrl?: string;
    encodingFormat?: string;
    duration?: string;
    height?: string;
    width?: string;
    interactionCount?: string;
    bitrate?: string;
    contentSize?: string;
    uploadDate?: string;
    isFamilyFriendly?: string;
    director?: string;
    views?: number;
    rating?: string;
    commentCount?: number;
};
