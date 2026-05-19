import { User } from './store/authStore';

const validateLoginHandler = async ({ email, password }: { email: string; password: string }) => {
  const getUser = await getUserApi({ email, password });

  return getUser;
};

const getUserApi = async ({ email, password }: { email: string; password: string }) => {
  const getUser = await new Promise<{ user: User | undefined; error: null | string }>(resolve => {
    setTimeout(() => {
      const getUser = USERS.find(x => x.email === email && x.password === password);
      const potentialUSer = USERS.find(x => x.email === email || x.password === password);

      if (potentialUSer && !getUser) {
        return { error: ERROR_MESSAGES.INCORRECT_CREDENTIALS };
      }

      if (!potentialUSer && !getUser) {
        return { error: ERROR_MESSAGES.USER_DOES_NOT_EXIST };
      }

      resolve({ user: getUser, error: null });
      return { user: getUser };
    }, 1000);
  });

  return { user: getUser, error: null };
};

const USERS = [
  { email: 'user1@example.com', password: 'pass123' },
  { email: 'user2@example.com', password: 'pass456' },
  { email: 'user3@example.com', password: 'pass789' },
  { email: 'user4@example.com', password: 'passabc' },
  { email: 'user5@example.com', password: 'passdef' },
  { email: 'user6@example.com', password: 'passghi' },
  { email: 'user7@example.com', password: 'passjkl' },
  { email: 'user8@example.com', password: 'passmno' },
  { email: 'user9@example.com', password: 'passpqr' },
  { email: 'user10@example.com', password: 'passstu' },
] as User[];

const ERROR_MESSAGES = {
  USER_DOES_NOT_EXIST: 'User does not exist!',
  INCORRECT_CREDENTIALS: 'incorrect credentials!',
  TOO_MANY_ATTEMPTS: 'too many attempts!',
} as const;

export { getUserApi, validateLoginHandler };

export { ERROR_MESSAGES, USERS };
