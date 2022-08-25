/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type ContentAttributes = {
    content: string;
    contentType: ContentAttributes.contentType;
};

export namespace ContentAttributes {

    export enum contentType {
        APPLICATION_JSON = 'application/json',
        TEXT_CSV = 'text/csv',
    }


}
