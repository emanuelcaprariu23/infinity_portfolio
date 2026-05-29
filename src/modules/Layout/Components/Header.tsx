import { useAuthHook } from '@/pages/Apps/TaskManagerApp/hooks/useAuthHook';
import { theme } from '@/theme';
import { Avatar, IconButton } from '@mui/material';
import { UserRound } from 'lucide-react';
import { useState } from 'react';
import UserMenu from './UserMenu';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const { user } = useAuthHook();

  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <header
      style={{
        backgroundColor: theme.custom.specialPalette?.variant[400],
        height: '40px',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          padding: '5px',
          marginRight: '10px',
        }}
      >
        {user && (
          <IconButton
            size="medium"
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleOpen}
            sx={{ zIndex: 10 }}
          >
            <Avatar
              sx={{
                width: '50px',
                height: '50px',
              }}
            >
              <UserRound />
            </Avatar>
          </IconButton>
        )}

        <UserMenu anchorEl={anchorEl} handleClose={handleClose} />
      </div>
    </header>
  );
};

export default Header;
