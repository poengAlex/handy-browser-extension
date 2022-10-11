/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export enum PartnerVideoStatus {
    /**
     * The partner video is unavailable due to an unspecific error.
     */
    ERROR = 'error',
    /**
     * The partner video is a duplicate. The externalRef is already used within the partner. Either change the externalRef or discard the video.
     */
    DUPLICATE = 'duplicate',
    /**
     * The partner video is pending verification.
     */
    PENDING_VERIFICATION = 'pending.verification',
    /**
     * The partner video is pending additional video metadata.
     */
    PENDING_METADATA = 'pending.metadata',
    /**
     * The partnervideo is pending scripting.
     */
    PENDING_SCRIPT = 'pending.script',
    /**
     * The partner video have been published and is available to users.
     */
    PUBLISHED = 'published',
}
