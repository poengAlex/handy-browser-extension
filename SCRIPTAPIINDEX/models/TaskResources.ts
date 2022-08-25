/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { ResourceInfo } from './ResourceInfo';

export type TaskResources = {
    videos?: Array<ResourceInfo>;
    scripts: Array<ResourceInfo>;
    screenshots?: Array<ResourceInfo>;
    gifs?: Array<ResourceInfo>;
};
