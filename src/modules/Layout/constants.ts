import { PATH_ROUTES } from '@/modules/Router/constants';
import { theme } from '@/theme';
import { SxProps, Theme } from '@mui/material';
import { convertToPathURI } from '../../Shared/Utils/Helpers/global-utils';
import { NavbarTabI } from './interfaces';

const NAVBAR_TABS_PAGES = [
  { path: '/', displayName: PATH_ROUTES.HOME },
  {
    path: convertToPathURI([PATH_ROUTES.PROJECTS]),
    displayName: PATH_ROUTES.PROJECTS,
  },
  {
    path: convertToPathURI([PATH_ROUTES.APPLICATIONS]),
    displayName: PATH_ROUTES.APPLICATIONS,
    isProtected: true,
  },
] as NavbarTabI[];

const tabsSx: SxProps<Theme> = {
  color: `${theme.custom.specialPalette?.variant[200]} !important`,
  backgroundColor: theme.custom.specialPalette?.variant[300],
  ':hover': {
    color: theme.custom.specialPalette?.variant[700],
  },
  '[aria-selected="false"]': {
    color: theme.custom.specialPalette?.variant[700],
    borderBottom: 0,
    ':hover': {
      backgroundColor: theme.custom.specialPalette?.variant[300],
    },
  },
  '& .Mui-selected': {
    backgroundColor: theme.custom.specialPalette?.variant[500],
    color: `${theme.custom.specialPalette?.variantMain} !important`,
  },
};

const tabSx: SxProps<Theme> = {
  borderColor: theme.custom.specialPalette?.variant[100],
};

export { NAVBAR_TABS_PAGES, tabsSx, tabSx };
