import {
  EMAIL_REGEX,
  ERROR_MESSAGES,
  PASSWORD_ERROR_MESSAGES,
  PASSWORD_LETTER_REGEX,
  PASSWORD_MIN_LENGTH_REGEX,
  PASSWORD_NUMBER_REGEX,
  PASSWORD_REGEX,
  PASSWORD_SPECIAL_CHAR_REGEX,
  USERS,
} from '@/pages/Auth/constants';
import { getRandomArbitrary } from '@/Shared/Utils/Helpers/global-utils';
import { User } from '../../Auth/store/authStore';

const getUserApi = async ({ email, password }: { email: string; password: string }) => {
  const response = await new Promise<{ user: User | undefined; error: null | string }>(resolve => {
    setTimeout(() => {
      const getUser = USERS.find(x => x.email === email && x.password === password);
      const potentialUSer = USERS.find(x => x.email === email || x.password === password);

      if (potentialUSer && !getUser) {
        resolve({ user: getUser, error: ERROR_MESSAGES.INCORRECT_CREDENTIALS });
        return { error: ERROR_MESSAGES.INCORRECT_CREDENTIALS };
      }

      if (!potentialUSer && !getUser) {
        resolve({ user: getUser, error: ERROR_MESSAGES.USER_DOES_NOT_EXIST });
        return { error: ERROR_MESSAGES.USER_DOES_NOT_EXIST };
      }

      resolve({ user: getUser, error: null });
      return { user: getUser };
    }, 1000);
  });

  return { user: response.user, error: response.error };
};

const registerUserApi = async ({ email, password }: { email: string; password: string }) => {
  const response = await new Promise<{ user: User | undefined; error: null | string }>(resolve => {
    setTimeout(() => {
      const randomId = generateUserId();
      const addUser = {
        email: email,
        password,
        userId: randomId,
      } as User;
      const getUser = USERS.find(x => x.email === email);

      if (getUser) {
        resolve({ user: undefined, error: ERROR_MESSAGES.USER_EXISTS });
        return { error: ERROR_MESSAGES.USER_EXISTS };
      }

      USERS.push(addUser);

      resolve({ user: addUser, error: null });
      return { user: addUser };
    }, 1000);
  });

  return { user: response.user, error: response.error };
};

const isEmptyString = (value: string) => value.trim() === '';
const isValidEmail = (email: string) => !isEmptyString(email) && EMAIL_REGEX.test(email);
const isValidPassword = (password: string) =>
  !isEmptyString(password) && PASSWORD_REGEX.test(password);

//TODO: REMOVE THIS
const getAuthErrorMessage = (password: string): string | null => {
  if (!PASSWORD_MIN_LENGTH_REGEX.test(password)) return PASSWORD_ERROR_MESSAGES.MIN_LENGTH_REGEX;
  if (!PASSWORD_LETTER_REGEX.test(password)) return PASSWORD_ERROR_MESSAGES.LETTER_REGEX;
  if (!PASSWORD_NUMBER_REGEX.test(password)) return PASSWORD_ERROR_MESSAGES.NOT_VALID;
  if (!PASSWORD_SPECIAL_CHAR_REGEX.test(password))
    return PASSWORD_ERROR_MESSAGES.SPECIAL_CHAR_REGEX;
  return null;
};

const generateUserId = () => {
  const random = Array.from(Array(10))
    .map(_ => getRandomArbitrary(0, 100))
    .join();
  return `user-`.concat(random);
};

export {
  generateUserId,
  getAuthErrorMessage,
  getUserApi,
  isEmptyString,
  isValidEmail,
  isValidPassword,
  registerUserApi,
};
