/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { DownloadOpts } from './DownloadOpts';
import type { FormatOpts } from './FormatOpts';
import type { PartnerMessages } from './PartnerMessages';
import type { TokenSettings } from './TokenSettings';
import type { UploadOpts } from './UploadOpts';

export type PartnerSettings = {
    upload: UploadOpts;
    download: DownloadOpts;
    token: TokenSettings;
    video?: FormatOpts;
    messages?: PartnerMessages;
};
