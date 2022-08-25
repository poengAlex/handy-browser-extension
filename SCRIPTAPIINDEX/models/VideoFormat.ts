/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type VideoFormat = {
    format?: VideoFormat.format;
    view?: VideoFormat.view;
};

export namespace VideoFormat {

    export enum format {
        VR = 'vr',
        FLAT = 'flat',
        UNKNOWN = 'unknown',
    }

    export enum view {
        _360 = '360',
        _180 = '180',
        NA = 'na',
    }


}
