/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { NewVideoRequest } from '../models/NewVideoRequest';
import type { ULID } from '../models/ULID';
import type { VideoRequest } from '../models/VideoRequest';
import type { VideoRequestStatus } from '../models/VideoRequestStatus';
import type { VideoRequestStatusUpdate } from '../models/VideoRequestStatusUpdate';
import type { VideoRequestVote } from '../models/VideoRequestVote';

import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class VideoRequestsService {

    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get a list of video requests. Editor access required.
     * Get a list of video requests. Editor access required.
     * @param take List limit
     * @param skip List offset
     * @param rs Video request status filter.
     * @returns VideoRequest Video requests
     * @throws ApiError
     */
    public getVideoRequests(
take: number = 100,
skip?: number,
rs?: Array<VideoRequestStatus>,
): CancelablePromise<Array<VideoRequest>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/requests',
            query: {
                'take': take,
                'skip': skip,
                'rs': rs,
            },
        });
    }

    /**
     * Create a video request.
     * Create a video request. Once the request have passed the content verification process it's considered 'registered' and can receive votes.
     * @param requestBody 
     * @returns VideoRequest An existing matching video request
     * @throws ApiError
     */
    public createVideoRequest(
requestBody: NewVideoRequest,
): CancelablePromise<VideoRequest> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/requests',
            body: requestBody,
            mediaType: 'application/json',
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
     * Get a video request.
     * Get a video request.
     * @param requestId The id of a video request
     * @returns VideoRequest Video request
     * @throws ApiError
     */
    public getVideoRequest(
requestId: ULID,
): CancelablePromise<VideoRequest> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/requests/{requestId}',
            path: {
                'requestId': requestId,
            },
        });
    }

    /**
     * Update a video request status.
     * Update a video request status. Editor access required.
     * @param requestId The id of a video request
     * @param requestBody 
     * @returns VideoRequest Video request
     * @throws ApiError
     */
    public updateVideoRequestStatus(
requestId: ULID,
requestBody: VideoRequestStatusUpdate,
): CancelablePromise<VideoRequest> {
        return this.httpRequest.request({
            method: 'PATCH',
            url: '/requests/{requestId}/status',
            path: {
                'requestId': requestId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }

    /**
     * Create a video request vote
     * Create a video request vote
     * @param requestId The id of a video request
     * @returns VideoRequestVote A matching video request vote
     * @throws ApiError
     */
    public createVideoRequestVote(
requestId: ULID,
): CancelablePromise<VideoRequestVote> {
        return this.httpRequest.request({
            method: 'PUT',
            url: '/requests/{requestId}/vote',
            path: {
                'requestId': requestId,
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
     * Get a list of video requests that can receive votes.
     * Get a list of video requests that can receive votes. These video request have been through the content verification process and can receive votes.
     * @param take List limit
     * @param skip List offset
     * @returns VideoRequest Video requests
     * @throws ApiError
     */
    public getRegisteredVideoRequests(
take: number = 100,
skip?: number,
): CancelablePromise<Array<VideoRequest>> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/requests/voting',
            query: {
                'take': take,
                'skip': skip,
            },
        });
    }

}
