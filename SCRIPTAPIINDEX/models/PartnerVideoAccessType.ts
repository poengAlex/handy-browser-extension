/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export enum PartnerVideoAccessType {
    /**
     * Video access requires some form of subscription.
     */
    PREMIUM = 'premium',
    /**
     * Video access is private. Special permission needed.
     */
    PRIVATE = 'private',
    /**
     * Video access is public. Free to use.
     */
    PUBLIC = 'public',
    /**
     * Video access is open. Free to use. Video content is downloadable.
     */
    OPEN = 'open',
}
