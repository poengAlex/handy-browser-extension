/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $URL = {
    type: 'string',
    description: `A HTTP URL.`,
    maxLength: 256,
    minLength: 10,
    pattern: '^https?://.{3,}$',
} as const;
