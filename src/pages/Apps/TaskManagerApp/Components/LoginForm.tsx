import { PATH_ROUTES } from '@/modules/Router/constants';
import { theme } from '@/theme';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';
import { useAuthStore, useAuthStoreLocalStorage } from '../store/authStore';
import { validateLoginHandler } from '../utils';

/***
 * TODO:
 * 2. Validate the username and password fields before submitting the form. For example, you can check if the username is empty or if the password meets certain complexity requirements
 * 3. Modify the simulated authentication logic to handle different scenarios, such as an incorrect username, an incorrect password, or a disabled account. Display appropriate error messages to the use
 */

const LoginForm: React.FC = () => {
  const { setUser } = useAuthStoreLocalStorage();
  const { setUser: setUserLocal } = useAuthStore();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [errorMessage, setErrorMessage] = useState<string | null>('TEXT');

  const submitHandler = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const { email, password, remember } = {
      email: formData.get('email')?.toString() || '',
      password: formData.get('password')?.toString() || '',
      remember: formData.get('rememberMe') === 'on',
    };

    const getUser = await validateLoginHandler({ email, password });
    if (getUser.user) {
      if (remember) {
        setUser({
          email,
          password,
          session: v4(),
        });
      }

      setUserLocal({
        email,
        password,
        session: v4(),
      });

      toast('Login successfully', { type: 'success' });
      return;
    }

    if (getUser.error) {
      setErrorMessage(getUser.error);
      toast(getUser.error, { type: 'error' });
    }
  };

  const redirectForgotPasswordHandler = () => {
    navigate(`${pathname}/${PATH_ROUTES.FORGOT_PASSWORD}`, {
      replace: true,
    });
  };

  return (
    <div style={{ display: 'flex', flexGrow: 1 }}>
      <form
        onSubmit={submitHandler}
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexGrow: 1,
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexGrow: 1,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',

              width: '40%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {errorMessage && (
              <div>
                <Typography
                  variant="h6"
                  sx={{ color: theme.palette.error.main, fontSize: '12px', fontWeight: 'bold' }}
                >
                  {errorMessage}
                </Typography>
              </div>
            )}
            <div style={{ width: '100%' }}>
              <Typography>Email</Typography>
              <TextField type={'email'} name="email" id="email" />
            </div>
            <div>
              <Typography>Password</Typography>
              <TextField type={'password'} name="password" />
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignContent: 'center',
                alignItems: 'center',
              }}
            >
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Remember me"
                name="rememberMe"
              />
              <div>
                <Link
                  sx={{ width: '100%', cursor: 'pointer', fontSize: '16px' }}
                  onClick={redirectForgotPasswordHandler}
                >
                  Forgot Password
                </Link>
              </div>
            </div>

            <div>
              <Button type="submit" variant={'contained'}>
                Login
              </Button>
            </div>
          </Box>
        </div>
      </form>
    </div>
  );
};

LoginForm.displayName = 'LoginForm';

export default LoginForm;
