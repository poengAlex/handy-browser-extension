/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Partner } from '../models/Partner';
import type { PartnerVideo } from '../models/PartnerVideo';
import type { Script } from '../models/Script';
import type { Tag } from '../models/Tag';
import type { TokenURL } from '../models/TokenURL';
import type { ULID } from '../models/ULID';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class IndexService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get a list of registered partners available to the current user.
     * Get a list of registered partners available to the current user. User level access required.
     * @param qn Partner name query.
     * @param tf Tag filters
     * @param take List limit
     * @param skip List offset
     * @returns Partner Available partners
     * @throws ApiError
     */
    public getPartners(
qn?: string,
tf?: Array<string>,
take: number = 100,
skip?: number,
): CancelablePromise<Array<Partner>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/partners',
            query: {
                'qn': qn,
                'tf': tf,
                'take': take,
                'skip': skip,
            },
            errors: {
                400: `Bad request.`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Resource not found.`,
                500: `Internal server error`,
            },
        });
    }

    /**
     * Get a list of tags available to the current user
     * Get a list of tags available to the current user
     * @param take Tag list limit
     * @param skip List offset
     * @returns Tag Available tags
     * @throws ApiError
     */
    public getTags(
take: number = 1000,
skip?: number,
): CancelablePromise<Array<Tag>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/tags',
            query: {
                'take': take,
                'skip': skip,
            },
        });
    }

    /**
     * Get a list of videos available to the current user
     * Get a list of videos available to the current user
     * @param qt Video title query.
     * @param tf Tag filters
     * @param pf Partner id filter.
     * @param take List limit
     * @param skip List offset
     * @returns PartnerVideo Available videos
     * @throws ApiError
     */
    public getVideos(
qt?: string,
tf?: Array<string>,
pf?: Array<ULID>,
take: number = 100,
skip?: number,
): CancelablePromise<Array<PartnerVideo>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/videos',
            query: {
                'qt': qt,
                'tf': tf,
                'pf': pf,
                'take': take,
                'skip': skip,
            },
        });
    }

    /**
     * Get video info
     * Get video info
     * @param partnerVideoId Video identifier
     * @returns PartnerVideo Partner video info
     * @throws ApiError
     */
    public getVideo(
partnerVideoId: ULID,
): CancelablePromise<PartnerVideo> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/videos/{partnerVideoId}',
            path: {
                'partnerVideoId': partnerVideoId,
            },
        });
    }

    /**
     * Get the available scripts for a video
     * Get the available scripts for a video
     * @param partnerVideoId Video identifier
     * @param take List limit
     * @param skip List offset
     * @returns Script Available video scripts
     * @throws ApiError
     */
    public getVideoScripts(
partnerVideoId: ULID,
take: number = 1000,
skip?: number,
): CancelablePromise<Array<Script>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/videos/{partnerVideoId}/scripts',
            path: {
                'partnerVideoId': partnerVideoId,
            },
            query: {
                'take': take,
                'skip': skip,
            },
        });
    }

    /**
     * Get a script token URL for the specified video.
     * Get a script token URL for the specified video.
     * @param partnerVideoId Video identifier
     * @param scriptId Script identifier
     * @returns TokenURL Token URL
     * @throws ApiError
     */
    public getTokenUrl(
partnerVideoId: ULID,
scriptId: ULID,
): CancelablePromise<TokenURL> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/videos/{partnerVideoId}/scripts/{scriptId}/token',
            path: {
                'partnerVideoId': partnerVideoId,
                'scriptId': scriptId,
            },
        });
    }

    /**
     * Get a video image
     * Get a video image
     * @param partnerVideoId Video identifier
     * @param imageId Image identifier
     * @returns binary Video image
     * @throws ApiError
     */
    public getVideoImage(
partnerVideoId: ULID,
imageId: string,
): CancelablePromise<Blob> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/videos/{partnerVideoId}/images/{imageId}',
            path: {
                'partnerVideoId': partnerVideoId,
                'imageId': imageId,
            },
        });
    }

    /**
     * Get a video image
     * Get a video image
     * @param partnerVideoId Video identifier
     * @param gifId Gif identifier
     * @returns binary Video gif
     * @throws ApiError
     */
    public getVideoGif(
partnerVideoId: ULID,
gifId: string,
): CancelablePromise<Blob> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/videos/{partnerVideoId}/gifs/{gifId}',
            path: {
                'partnerVideoId': partnerVideoId,
                'gifId': gifId,
            },
        });
    }

    /**
     * Get a snapshot of the index.
     * Get a snapshot of the index.
     * @returns PartnerVideo Available videos
     * @throws ApiError
     */
    public getIndex(): CancelablePromise<Array<PartnerVideo>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/index',
        });
    }

    /**
     * Lookup a matching video in index
     * Lookup a matching video in index
     * @param v video reference
     * @param p partner reference
     * @returns PartnerVideo Matching video
     * @throws ApiError
     */
    public lookup(
v?: string,
p?: string,
): CancelablePromise<PartnerVideo> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/lookup',
            query: {
                'v': v,
                'p': p,
            },
        });
    }

}
