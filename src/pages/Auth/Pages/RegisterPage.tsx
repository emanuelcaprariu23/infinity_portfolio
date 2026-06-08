import { SLASH_SPLIT_STRING } from '@/pages/Projects/KnowledgeHub/Contents/Tabs/pages/Hooks/contents';
import { Spinner } from '@/Shared/Components';
import { theme } from '@/theme';
import { zodResolver } from '@hookform/resolvers/zod';
import { Box, Button, Typography } from '@mui/material';
import React, { useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { RegisterDataT, registerSchema } from '../../Apps/TaskManagerApp/interfaces';
import FormField from '../Components/FormField';
import { useAuthHook } from '../hooks/useAuthHook';

const defaultRegisterValues: RegisterDataT = {
  email: '',
  password: '',
  rePassword: '',
};

const RegisterPage: React.FC = () => {
  const { registerHandler } = useAuthHook();

  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<RegisterDataT>({
    resolver: zodResolver(registerSchema),
    defaultValues: defaultRegisterValues,
    shouldFocusError: false,
  });

  const submitHandler = async (data: RegisterDataT) => {
    const { email, password } = data;

    startTransition(async () => {
      const data = await registerHandler({ email, password });

      if (data.user) {
        toast('Your account has been created!', { type: 'success' });
        const backward =
          SLASH_SPLIT_STRING +
          pathname.split(SLASH_SPLIT_STRING).slice(1, -1).join(SLASH_SPLIT_STRING);
        navigate(backward ? `${backward}` : SLASH_SPLIT_STRING, { replace: true });
      }

      if (data.error) {
        setError('form', { message: data.error });
        toast(data.error, { type: 'error' });
      }
    });
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
              error={errors.rePassword?.message}
              type={'password'}
            />

            <div>
              <Button
                type="submit"
                variant={'contained'}
                disabled={isPending}
                sx={{ display: 'flex', flexDirection: 'row', gap: '5px', alignItems: 'center' }}
              >
                {isPending || (isSubmitting && <Spinner size={'1.2em'} />)}
                Register
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
