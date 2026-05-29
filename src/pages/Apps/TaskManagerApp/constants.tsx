import { PageContentI } from '@/pages/Projects/KnowledgeHub/interfaces';
import IntroductionContent from './Components/IntroductionContent';
import { User } from './store/authStore';

const AUTH_TASK_MANAGER_APP_CONTENTS: PageContentI[] = [
  {
    elementId: 'introduction-auth-task-manager-app',
    title: 'Introduction Auth Task Manager App',
    children: <IntroductionContent />,
  },
];

const USERS = [
  { email: 'user1@example.com', password: 'pass123@222', userId: 'user-11234124502' },
  { email: 'user2@example.com', password: 'pass456!222', userId: 'user-21234124502' },
  { email: 'user3@example.com', password: 'pass789#22', userId: 'user-31234124502' },
  { email: 'user4@example.com', password: 'passabc$22', userId: 'user-41234124502' },
  { email: 'user5@example.com', password: 'passdef@22', userId: 'user-51234124502' },
  { email: 'user6@example.com', password: 'passghi@22', userId: 'user-61234124502' },
  { email: 'user7@example.com', password: 'passjkl222@', userId: 'user-71234124502' },
  { email: 'user8@example.com', password: 'passmno@222', userId: 'user-81234124502' },
  { email: 'user9@example.com', password: 'passpqr@222', userId: 'user-91234124502' },
  { email: 'user10@example.com', password: 'passstu@2222', userId: 'user-101234124502' },
  { email: 'admin@email.com', password: 'aaaa23fa#', userId: 'user-admin-11234124502' },
] as User[];

const ERROR_MESSAGES = {
  USER_DOES_NOT_EXIST: 'User does not exist!',
  USER_EXISTS: 'User exists!',
  INCORRECT_CREDENTIALS: 'Incorrect credentials!',
  TOO_MANY_ATTEMPTS: 'Too many attempts!',
  EMAIL_NOT_VALID: 'Email is not valid!',
  PASSWORD_NOT_VALID: 'Password not valid!',
  PASSWORD_MIN_LENGTH_REGEX: 'Password must has minimum 8 characters!',
  PASSWORD_LETTER_REGEX: 'Password must contain 1 letter character at least!',
  PASSWORD_SPECIAL_CHAR_REGEX: 'Password must contain 1 special character at least!',
  PASSWORDS_DON_T_MATCH: `Passwords don't match!`,
} as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN_LENGTH_REGEX = /^.{8,}$/;
const PASSWORD_LETTER_REGEX = /[A-Za-z]/;
const PASSWORD_NUMBER_REGEX = /\d/;
const PASSWORD_SPECIAL_CHAR_REGEX = /[^A-Za-z0-9]/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

const TASK_MANAGER_APP_LOCAL_STORAGE_KEYS = {
  taskManagerAppTodos: 'taskManagerAppTodos',
} as const;

export {
  AUTH_TASK_MANAGER_APP_CONTENTS,
  EMAIL_REGEX,
  ERROR_MESSAGES,
  PASSWORD_LETTER_REGEX,
  PASSWORD_MIN_LENGTH_REGEX,
  PASSWORD_NUMBER_REGEX,
  PASSWORD_REGEX,
  PASSWORD_SPECIAL_CHAR_REGEX,
  TASK_MANAGER_APP_LOCAL_STORAGE_KEYS,
  USERS,
};
