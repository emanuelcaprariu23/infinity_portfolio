import { getTimeOfDay } from '@/Shared/Utils/Helpers/global-utils';
import { theme } from '@/theme';
import { Typography } from '@mui/material';
import React from 'react';
import { useAuthHook } from '../hooks/useAuthHook';

const WelcomeHead: React.FC = () => {
  const { user } = useAuthHook();

  return (
    <div>
      <Typography variant="h5" sx={{ color: theme.palette.text.secondary }}>
        Good {getTimeOfDay()} {user?.email}!
      </Typography>
    </div>
  );
};

WelcomeHead.displayName = 'WelcomeHead';

export default WelcomeHead;
