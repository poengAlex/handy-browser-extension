export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface BexStatePart {
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
  title: string,
  url: string,
}