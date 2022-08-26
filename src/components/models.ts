import { PartnerVideo } from 'app/SCRIPTAPIINDEX'

export interface BexStatePart {
  partnerVideo?: PartnerVideo,
  settingScript?: boolean,
  scriptSet?: boolean,
  searchingForScript?: boolean,
  scriptFound?: boolean,
  scriptTokenUrl?: string,
  tabUrl?: string,
}

export interface BexState extends BexStatePart {
  settingScript: boolean,
  scriptSet: boolean,
  searchingForScript: boolean,
  scriptFound: boolean,
  scriptTokenUrl: string,
  tabUrl: string,
}

export type VideoData = {
  platform: string,
  partnerId: string,
  externalRef: string,
  title: string,
  url: string,
}
