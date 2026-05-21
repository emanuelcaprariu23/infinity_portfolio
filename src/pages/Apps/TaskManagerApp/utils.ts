import {
  EMAIL_REGEX,
  ERROR_MESSAGES,
  PASSWORD_LETTER_REGEX,
  PASSWORD_MIN_LENGTH_REGEX,
  PASSWORD_NUMBER_REGEX,
  PASSWORD_REGEX,
  PASSWORD_SPECIAL_CHAR_REGEX,
  USERS,
} from './constants';
import { User } from './store/authStore';

const validateLoginHandler = async ({ email, password }: { email: string; password: string }) => {
  const getUser = await getUserApi({ email, password });

  return getUser;
};

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

const isEmptyString = (value: string) => value.trim() === '';
const isValidEmail = (email: string) => !isEmptyString(email) && EMAIL_REGEX.test(email);
const isValidPassword = (password: string) =>
  !isEmptyString(password) && PASSWORD_REGEX.test(password);

const getAuthErrorMessage = (password: string): string | null => {
  if (!PASSWORD_MIN_LENGTH_REGEX.test(password)) return ERROR_MESSAGES.PASSWORD_MIN_LENGTH_REGEX;
  if (!PASSWORD_LETTER_REGEX.test(password)) return ERROR_MESSAGES.PASSWORD_LETTER_REGEX;
  if (!PASSWORD_NUMBER_REGEX.test(password)) return ERROR_MESSAGES.PASSWORD_NOT_VALID;
  if (!PASSWORD_SPECIAL_CHAR_REGEX.test(password))
    return ERROR_MESSAGES.PASSWORD_SPECIAL_CHAR_REGEX;
  return null;
};

export {
  getAuthErrorMessage,
  getUserApi,
  isEmptyString,
  isValidEmail,
  isValidPassword,
  validateLoginHandler,
};
