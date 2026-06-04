import { theme } from '@/theme';
import { Tab, Tabs } from '@mui/material';
import { startTransition, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { NAVBAR_TABS_PAGES, tabsSx, tabSx } from '../constants';

const currentPathDefault = (pathname: string[]) => {
  let defaultValue = '/';
  if (pathname.length > 1) {
    defaultValue += pathname[1];
  }
  return defaultValue;
};

export const Navbar = () => {
  const { pathname } = useLocation();

  // you can use useTransition to defer the navigation update, allowing the UI to remain responsive during the transition
  const [value, setValue] = useState<string>(currentPathDefault(pathname.split('/')));

  const navigate = useNavigate();

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
    startTransition(() => {
      navigate(newValue);
    });
  };

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        borderRadius: '0 0 10px 10px',
        boxShadow: theme.custom.boxShadows?.main,
      }}
    >
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        sx={{ ...tabsSx }}
      >
        {NAVBAR_TABS_PAGES.map(x => {
          return <Tab label={x.displayName} key={x.path} value={x.path} sx={{ ...tabSx }} />;
        })}
      </Tabs>
    </nav>
  );
};

export default Navbar;
