import { CenteredBox, FlexWithGapBox } from '@/Shared/Utils/Helpers/styled-components';
import { Button, FormGroup, TextField, Typography } from '@mui/material';
import React from 'react';
import { v4 } from 'uuid';
import { useAuthStore, useAuthStoreLocalStorage } from '../store/authStore';
import CheckCode from './CheckCode';

const ForgotPassword: React.FC = () => {
  const { setUser: setUserLocal } = useAuthStore();
  const { validationCode } = useAuthStoreLocalStorage();

  const submitHandler = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const { email, password } = {
      email: formData.get('password')?.toString() || '',
      password: formData.get('repassword')?.toString() || '',
    };

    setUserLocal({
      email,
      password,
      session: v4(),
    });
  };

  return (
    <FlexWithGapBox sx={{ padding: '20px', gap: '4px', flexGrow: 1 }}>
      <CenteredBox sx={{ flexGrow: 1 }}>
        {validationCode ? (
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
                flexGrow: 1,
              }}
            >
              <FormGroup
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  width: '100%',
                  gap: '10px',
                }}
              >
                <div style={{ width: '30%' }}>
                  <Typography>Password</Typography>
                  <TextField type={'email'} name="email" id="email" sx={{ width: '100%' }} />
                </div>
                <div style={{ width: '30%' }}>
                  <Typography>Re-Password</Typography>
                  <TextField type={'password'} name="password" sx={{ width: '100%' }} />
                </div>

                <div>
                  <Button type="submit" variant={'contained'}>
                    Update
                  </Button>
                </div>
              </FormGroup>
            </div>
          </form>
        ) : (
          <CheckCode />
        )}
      </CenteredBox>
    </FlexWithGapBox>
  );
};

ForgotPassword.displayName = 'ForgotPassword';

export { ForgotPassword };
