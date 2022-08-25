/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export const $ULID = {
    type: 'string',
    description: `Universally Unique Lexicographically Sortable Identifier`,
    maxLength: 26,
    minLength: 26,
    pattern: '^[0-9ABCDEFGHJKMNPQRSTVWXYZ]{26}$',
} as const;
