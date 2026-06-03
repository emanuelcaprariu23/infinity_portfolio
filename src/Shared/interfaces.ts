import { PATH_ROUTES } from '@/modules/Router/constants';
import { OPTIONS_APP_MENU_TYPE, URL_QUERY_TYPE } from '@/pages/Projects/KnowledgeHub/constants';
import { DAYTIME } from './constants';

export type CustomColorI = Record<string, string>;
export type SearchQueryParamsT = 'openAll' | 'fullMode';

export const SearchQueryParamsV = {
  openAll: 'openAll',
  fullMode: 'fullMode',
} as const satisfies Record<SearchQueryParamsT, SearchQueryParamsT>;

export const MODE_COLOR = {
  DARK: 'dark',
  LIGHT: 'light',
} as const;

export interface UrlQueryType {
  openAll: boolean;
  fullMode: boolean;
}

export interface ProjectI {
  title: string;
  route: PATH_ROUTES;
  description?: string;
  projectId: string;
}

export type UseUrlQueryParamsReturnType = (typeof URL_QUERY_TYPE)[keyof typeof URL_QUERY_TYPE];
export type OptionsAppMenuType = (typeof OPTIONS_APP_MENU_TYPE)[keyof typeof OPTIONS_APP_MENU_TYPE];
export type DaytimeType = (typeof DAYTIME)[keyof typeof DAYTIME];
export type ModeColorType = (typeof MODE_COLOR)[keyof typeof MODE_COLOR];
