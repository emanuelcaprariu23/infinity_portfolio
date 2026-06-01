import { getDefaultSubTabSelectedIndex } from '@/pages/Projects/KnowledgeHub/helpful';
import { useUrlQueryParams } from '@/Shared/Hooks';
import { theme } from '@/theme';
import { Box, Switch, Typography } from '@mui/material';
import { Eye, EyeClosed } from 'lucide-react';
import React, { useCallback } from 'react';

interface Props {
  label?: string;
  isClosed?: boolean;
  showIcons?: boolean;
  isSwitched: boolean | undefined;
  setIsSwitched: React.Dispatch<React.SetStateAction<boolean>>;
}

const Switcher: React.FC<Props> = ({ isSwitched, label, setIsSwitched, showIcons }) => {
  const { handleURLQueryParams, hash } = useUrlQueryParams();

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      if (setIsSwitched) {
        const checked = event.target.checked;
        setIsSwitched(checked);
        handleURLQueryParams(getDefaultSubTabSelectedIndex(hash), checked);
      }
    },
    [handleURLQueryParams, hash, setIsSwitched],
  );

  return (
    <Box
      sx={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: theme.spacing(1),
      }}
    >
      {showIcons && <Box>{isSwitched ? <EyeClosed /> : <Eye />}</Box>}
      {label && (
        <Typography variant="h6" sx={{ color: theme.custom.specialPalette?.variantSecondaryDark }}>
          {label}
        </Typography>
      )}

      <Switch
        checked={isSwitched}
        onChange={handleChange}
        disableRipple
        disableFocusRipple
        disableTouchRipple
      />
    </Box>
  );
};

Switcher.displayName = 'Switcher';

export { Switcher };
