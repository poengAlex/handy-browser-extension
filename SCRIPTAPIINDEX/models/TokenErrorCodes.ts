/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * The different possible token specific error codes. <p> <ul> <li>TOKEN_ERROR(2000) - Unspecified token error.</li> <li>TOKEN_URL_EXPIRED(2001) - The token URL have expired.</li> <li>TOKEN_EXPIRED(2002) - The token have expired.</li> <li>TOKEN_INVALID(2003) - The token is invalid.</li> <li>TOKEN_RESTRICTED(2004) - The token can not be used in the current context.</li> <li>TOKEN_URL_INVALID(2005) - The token URL is invalid.</li> </ul>
 */
export enum TokenErrorCodes {
    /**
     * Unspecified token error.
     */
    TOKEN_ERROR = 2000,
    /**
     * The token URL have expired.
     */
    TOKEN_URL_EXPIRED = 2001,
    /**
     * The token have expired.
     */
    TOKEN_EXPIRED = 2002,
    /**
     * The token is invalid.
     */
    TOKEN_INVALID = 2003,
    /**
     * The token can not be used in the current context.
     */
    TOKEN_RESTRICTED = 2004,
    /**
     * The token URL is invalid.
     */
    TOKEN_URL_INVALID = 2005,
}
