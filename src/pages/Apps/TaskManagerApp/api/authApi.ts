import { getUserApi, registerUserApi } from '../utils';

const validateLoginHandler = async ({ email, password }: { email: string; password: string }) => {
  const data = await getUserApi({ email, password });

  return data;
};

const validateRegisterHandler = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const data = await registerUserApi({ email, password });
  return data;
};

const loginHandlerWithJWTSimulation = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const data = await getUserApi({ email, password });
  // Simulate different backend responses based on credentials
  if (data.user) {
    return {
      user: data.user,
      error: null,
      status: 200,
      json: () =>
        Promise.resolve({
          message: 'Login successful!',
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ0ZXN0VXNlciIsInVzZXJuYW1lIjoidGVzdHVzZXIiLCJpYXQiOjE2NzEwMDAwMDAsImV4cCI6MTY3MTAwMzYwMH0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
        }),
    };
  } else {
    return {
      user: null,
      error: data.error || 'Authentication failed',
      status: 401,
      json: () =>
        Promise.resolve({
          message: data.error || 'Authentication failed',
          token: null,
        }),
    };
  }
};

export { loginHandlerWithJWTSimulation, validateLoginHandler, validateRegisterHandler };
