/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NewScriptComment } from '../models/NewScriptComment';
import type { NewScriptRating } from '../models/NewScriptRating';
import type { Partner } from '../models/Partner';
import type { PartnerVideo } from '../models/PartnerVideo';
import type { Performer } from '../models/Performer';
import type { Script } from '../models/Script';
import type { ScriptComment } from '../models/ScriptComment';
import type { ScriptRating } from '../models/ScriptRating';
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
     * @param pif Performer id filter.
     * @param pf Partner id filter.
     * @param take List limit
     * @param skip List offset
     * @returns PartnerVideo Available videos
     * @throws ApiError
     */
    public getVideos(
qt?: string,
tf?: Array<string>,
pif?: Array<ULID>,
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
                'pif': pif,
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
     * Add a rating to a script
     * Add a rating to a script
     * @param partnerVideoId Video identifier
     * @param scriptId Script identifier
     * @param requestBody 
     * @returns ScriptRating Script info
     * @throws ApiError
     */
    public createScriptRating(
partnerVideoId: ULID,
scriptId: ULID,
requestBody: NewScriptRating,
): CancelablePromise<ScriptRating> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/videos/{partnerVideoId}/scripts/{scriptId}/rating',
            path: {
                'partnerVideoId': partnerVideoId,
                'scriptId': scriptId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Get script comments
     * Get script comments. Editor access required.
     * @param partnerVideoId Video identifier
     * @param scriptId Script identifier
     * @param take Comment list limit
     * @param skip Comment list offset
     * @returns ScriptComment Script comments
     * @throws ApiError
     */
    public getScriptComments(
partnerVideoId: ULID,
scriptId: ULID,
take: number = 20,
skip?: number,
): CancelablePromise<ScriptComment> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/videos/{partnerVideoId}/scripts/{scriptId}/comments',
            path: {
                'partnerVideoId': partnerVideoId,
                'scriptId': scriptId,
            },
            query: {
                'take': take,
                'skip': skip,
            },
        });
    }

    /**
     * Create a script feedback comment.
     * Create a script feedback comment.
     * @param partnerVideoId Video identifier
     * @param scriptId Script identifier
     * @param requestBody 
     * @returns ScriptComment Script comment
     * @throws ApiError
     */
    public createScriptComment(
partnerVideoId: ULID,
scriptId: ULID,
requestBody: NewScriptComment,
): CancelablePromise<ScriptComment> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/videos/{partnerVideoId}/scripts/{scriptId}/comments',
            path: {
                'partnerVideoId': partnerVideoId,
                'scriptId': scriptId,
            },
            body: requestBody,
            mediaType: 'application/json',
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

    /**
     * Get a list of registered performers available to the current user.
     * Get a list of registered performers available to the current user. User level access required.
     * @param qn Performer name query.
     * @param tf Tag filters
     * @param pf Partner id filter.
     * @param take Performer list limit
     * @param skip List offset
     * @returns Performer Available performers
     * @throws ApiError
     */
    public getPerformers(
qn?: string,
tf?: Array<string>,
pf?: Array<ULID>,
take: number = 100,
skip?: number,
): CancelablePromise<Array<Performer>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/performers',
            query: {
                'qn': qn,
                'tf': tf,
                'pf': pf,
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
     * Get performer info
     * Get performer info
     * @param performerId Performer identifier
     * @returns Performer Performer info
     * @throws ApiError
     */
    public getPerformer(
performerId: ULID,
): CancelablePromise<Performer> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/performers/{performerId}',
            path: {
                'performerId': performerId,
            },
        });
    }

}
