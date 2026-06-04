import { PATH_ROUTES } from '@/modules/Router/constants';
import { Spinner } from '@/Shared/Components';
import { SpaceBetweenRowBox } from '@/Shared/Utils/Helpers/styled-components';
import { theme } from '@/theme';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Checkbox, FormControlLabel, Link, Typography } from '@mui/material';
import { LogIn } from 'lucide-react';
import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import FormField from '../Components/FormField';
import { useAuthHook } from '../hooks/useAuthHook';
import { LoginDataT, loginSchema } from '../interfaces';

/***
 * TODO: DO SOME RESEARCH + TRY TO IMPLEMENT
 * 1. HTTPS Simulation: If you're working on a local development environment, simulate HTTPS by setting up a self-signed certificate. This will allow you to test your application with HTTPS enabled.
 * 2. CSP Implementation: Research Content Security Policy (CSP) and implement a basic CSP in a test HTML file to restrict script sources. Experiment with different CSP directives to understand how they affect the loading of resources.
 */

const defaultLoginValues: LoginDataT = {
  email: '',
  password: '',
  rememberMe: true,
};

const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { loginHandler, loginWithJWTHandler } = useAuthHook();

  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<LoginDataT>({
    resolver: zodResolver(loginSchema),
    defaultValues: defaultLoginValues,
    shouldFocusError: false,
  });

  const submitHandler = ({ email, password, rememberMe }: LoginDataT) => {
    startTransition(async () => {
      const data = await loginHandler({ email, password, remember: !!rememberMe });

      if (data.user) {
        toast('Login successfully', { type: 'success' });
      }

      if (data.error) {
        setError('form', { type: 'manual', message: data.error });
        toast(data.error, { type: 'error' });
      }
    });
  };

  const submitJWTVariantHandler = ({ email, password, rememberMe }: LoginDataT) => {
    startTransition(async () => {
      const data = await loginWithJWTHandler({
        email,
        password,
        remember: !!rememberMe,
      });

      const result = await data.json();

      if (data.status === 200 && result.token) {
        console.log('Received JWT:', result.token);
        toast('Login successfully', { type: 'success' });
        return;
      }

      if (result.message) {
        setError('form', { type: 'manual', message: result.message });
        toast(result.message, { type: 'error' });
      }
    });
  };

  const redirectToForgotPasswordHandler = () => {
    navigate(`${pathname}/${PATH_ROUTES.FORGOT_PASSWORD}`, {
      replace: true,
    });
  };

  const redirectToRegisterHandler = () => {
    navigate(`${PATH_ROUTES.REGISTER_PAGE}`, {});
  };

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
                  {errors.form.message}
                </Typography>
              </div>
            )}
            {/* <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography>Email</Typography>
              <TextField
                type={'email'}
                name="email"
                id="email"
                onChange={onChange}
                disabled={isPending}
              />
            </div> */}

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

            <div
              style={{
                display: 'flex',
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignContent: 'center',
                alignItems: 'center',
                paddingLeft: '20px',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <Link
                  sx={{
                    width: '100%',
                    cursor: isPending ? 'default' : 'pointer',
                    fontSize: '16px',
                    pointerEvents: isPending ? 'none' : 'auto',
                  }}
                  onClick={redirectToRegisterHandler}
                >
                  {`  Don't have an account? register now`}
                </Link>
                <FormControlLabel
                  control={
                    <Checkbox defaultChecked disabled={isPending} {...register('rememberMe')} />
                  }
                  label="Remember me"
                />
              </div>
              <div>
                <Link
                  sx={{
                    width: '100%',
                    cursor: isPending ? 'default' : 'pointer',
                    fontSize: '16px',
                    pointerEvents: isPending ? 'none' : 'auto',
                  }}
                  onClick={redirectToForgotPasswordHandler}
                >
                  Forgot Password
                </Link>
              </div>
            </div>

            <SpaceBetweenRowBox sx={{ width: '100%', justifyContent: 'center' }}>
              <Button
                type="submit"
                variant={'contained'}
                disabled={isPending}
                sx={{ display: 'flex', flexDirection: 'row', gap: '5px', alignItems: 'center' }}
              >
                {isPending || isSubmitting ? <Spinner size={'1.2em'} /> : <LogIn size={'1.2em'} />}{' '}
                Login
              </Button>
              <Button
                type="button"
                onClick={ev => {
                  ev.preventDefault();
                  submitJWTVariantHandler(getValues());
                }}
                variant={'contained'}
                disabled={isPending}
                sx={{ display: 'flex', flexDirection: 'row', gap: '5px', alignItems: 'center' }}
              >
                {isSubmitting ? <Spinner size={'1.2em'} /> : <LogIn size={'1.2em'} />} Login With
                JWT
              </Button>
            </SpaceBetweenRowBox>
          </Box>
        </div>
      </form>
    </div>
  );
};

LoginForm.displayName = 'LoginForm';

export default LoginForm;
