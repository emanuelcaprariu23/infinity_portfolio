import { Spinner } from '@/Shared/Components';
import { theme } from '@/theme';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Typography } from '@mui/material';
import { LogIn } from 'lucide-react';
import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';
import FormField from '../Components/FormField';
import { RegisterDataT, registerSchema } from '../interfaces';
import { useAuthStore, useAuthStoreLocalStorage } from '../store/authStore';
import { validateLoginHandler } from '../utils';

const RegisterPage: React.FC = () => {
  const { setUser } = useAuthStoreLocalStorage();
  const { setUser: setUserLocal } = useAuthStore();

  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterDataT>({
    resolver: zodResolver(registerSchema),
  });

  const submitHandler = async (data: RegisterDataT) => {
    const { email, password, rePassword } = data;

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
        setError('form', { message: getUser.error });
        toast(getUser.error, { type: 'error' });
      }
    });
  };

  // const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement, Element>) => {
  //   const { name, value } = e.target;
  //   setErrorMessage(null);

  //   if (name === 'email') {
  //     if (!isValidEmail(value)) {
  //       setErrorMessage(ERROR_MESSAGES.EMAIL_NOT_VALID);
  //     }
  //     return;
  //   }

  //   if (name === 'password') {
  //     if (!isValidPassword(value)) {
  //       const getMessage = getAuthErrorMessage(value);
  //       setErrorMessage(getMessage);
  //     }
  //     return;
  //   }
  // };

  console.log({ errors });

  return (
    <div style={{ display: 'flex', flexGrow: 1 }}>
      <form
        method="post"
        action=""
        onSubmit={handleSubmit(submitHandler)}
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
            {errors.form && (
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
                  {errors.form?.message}
                </Typography>
              </div>
            )}

            <FormField
              field={register('email')}
              label={'Email'}
              required
              disabled={isPending}
              error={errors.email?.message}
              type={'email'}
            />

            <FormField
              field={register('password')}
              label={'Password'}
              required
              disabled={isPending}
              error={errors.password?.message}
              type={'password'}
            />
            <FormField
              field={register('rePassword')}
              label={'Confirm Password'}
              required
              disabled={isPending}
              error={errors.password?.message}
              type={'password'}
            />

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
