import { Spinner } from '@/Shared/Components';
import { theme } from '@/theme';
import { Box, Button, TextField, Typography } from '@mui/material';
import { LogIn } from 'lucide-react';
import React, { useState, useTransition } from 'react';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';
import { ERROR_MESSAGES } from '../constants';
import { useAuthStore, useAuthStoreLocalStorage } from '../store/authStore';
import { getAuthErrorMessage, isValidEmail, isValidPassword, validateLoginHandler } from '../utils';

const RegisterPage: React.FC = () => {
  const { setUser } = useAuthStoreLocalStorage();
  const { setUser: setUserLocal } = useAuthStore();

  const [errorMessage, setErrorMessage] = useState<string | null>('');
  const [isPending, startTransition] = useTransition();

  const submitHandler = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const { email, password, rePassword } = {
      email: formData.get('email')?.toString() || '',
      password: formData.get('password')?.toString() || '',
      rePassword: formData.get('re-password')?.toString() || '',
    };

    startTransition(async () => {
      const getUser = await validateLoginHandler({ email, password });

      if (getUser.user) {
        setUserLocal({
          email,
          password,
          session: v4(),
        });

        toast('Your account has been created!', { type: 'success' });
      }

      if (getUser.error) {
        setErrorMessage(getUser.error);
        toast(getUser.error, { type: 'error' });
      }
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
                autoComplete="off"
              />
            </div>

            <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography>Confirm Password</Typography>
              <TextField
                type={'password'}
                name="re-password"
                onChange={onChange}
                disabled={isPending}
                autoComplete="off"
              />
            </div>

            <div>
              <Button
                type="submit"
                variant={'contained'}
                disabled={isPending}
                sx={{ display: 'flex', flexDirection: 'row', gap: '5px', alignItems: 'center' }}
              >
                {isPending ? <Spinner size={'1.2em'} /> : <LogIn size={'1.2em'} />} Register
              </Button>
            </div>
          </Box>
        </div>
      </form>
    </div>
  );
};

RegisterPage.displayName = 'RegisterPage';

export { RegisterPage };
