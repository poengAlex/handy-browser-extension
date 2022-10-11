/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export enum ScriptAccessType {
    /**
     * Script access requires some form of subscription.
     */
    PREMIUM = 'premium',
    /**
     * Script access is private. Special permission needed.
     */
    PRIVATE = 'private',
    /**
     * Script access is public. Free to use. Script token is downloadable.
     */
    PUBLIC = 'public',
    /**
     * Script access is open. Free to use. Script content is downloadable.
     */
    OPEN = 'open',
}
