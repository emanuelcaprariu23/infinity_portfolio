import { PATH_ROUTES } from '@/modules/Router/constants';
import { Spinner } from '@/Shared/Components';
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
import { LogIn } from 'lucide-react';
import React, { useState, useTransition } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';
import { ERROR_MESSAGES } from '../constants';
import { useAuthStore, useAuthStoreLocalStorage } from '../store/authStore';
import { getAuthErrorMessage, isValidEmail, isValidPassword, validateLoginHandler } from '../utils';

/***
 * TODO:
 */

const LoginForm: React.FC = () => {
  const { setUser } = useAuthStoreLocalStorage();
  const { setUser: setUserLocal } = useAuthStore();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [errorMessage, setErrorMessage] = useState<string | null>('');
  const [isPending, startTransition] = useTransition();

  const submitHandler = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const { email, password, remember } = {
      email: formData.get('email')?.toString() || '',
      password: formData.get('password')?.toString() || '',
      remember: formData.get('rememberMe') === 'on',
    };

    startTransition(async () => {
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
      }

      if (getUser.error) {
        setErrorMessage(getUser.error);
        toast(getUser.error, { type: 'error' });
      }
    });
  };

  const redirectForgotPasswordHandler = () => {
    navigate(`${pathname}/${PATH_ROUTES.FORGOT_PASSWORD}`, {
      replace: true,
    });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
    const { name, value } = e.target;
    setErrorMessage(null);

    if (name === 'email') {
      if (!isValidEmail(value)) {
        setErrorMessage(ERROR_MESSAGES.EMAIL_NOT_VALID);
      }
      return;
    }

    if (name === 'password') {
      if (!isValidPassword(value)) {
        const getMessage = getAuthErrorMessage(value);
        setErrorMessage(getMessage);
      }
      return;
    }
  };

  return (
    <div style={{ display: 'flex', flexGrow: 1 }}>
      <form
        method="post"
        action=""
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
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                  textAlign: 'right',
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ color: theme.palette.error.main, fontSize: '14px', fontWeight: 'bold' }}
                >
                  {errorMessage}
                </Typography>
              </div>
            )}
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography>Email</Typography>
              <TextField
                type={'email'}
                name="email"
                id="email"
                onChange={onChange}
                disabled={isPending}
              />
            </div>
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography>Password</Typography>
              <TextField
                type={'password'}
                name="password"
                onChange={onChange}
                disabled={isPending}
              />
            </div>
            <div
              style={{
                display: 'flex',
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignContent: 'center',
                alignItems: 'center',
              }}
            >
              <FormControlLabel
                control={<Checkbox name="rememberMe" defaultChecked disabled={isPending} />}
                label="Remember me"
              />
              <div>
                <Link
                  sx={{
                    width: '100%',
                    cursor: isPending ? 'default' : 'pointer',
                    fontSize: '16px',
                    pointerEvents: isPending ? 'none' : 'auto',
                  }}
                  onClick={redirectForgotPasswordHandler}
                >
                  Forgot Password
                </Link>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                variant={'contained'}
                disabled={isPending}
                sx={{ display: 'flex', flexDirection: 'row', gap: '5px', alignItems: 'center' }}
              >
                {isPending ? <Spinner size={'1.2em'} /> : <LogIn size={'1.2em'} />} Login
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
