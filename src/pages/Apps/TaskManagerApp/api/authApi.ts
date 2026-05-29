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

export { validateLoginHandler, validateRegisterHandler };
