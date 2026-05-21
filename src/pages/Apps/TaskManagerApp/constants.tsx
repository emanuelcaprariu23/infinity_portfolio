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
  EMAIL_NOT_VALID: 'email not valid!',
  PASSWORD_NOT_VALID: 'password not valid!',
  PASSWORD_MIN_LENGTH_REGEX: 'password must has minimum 8 characters!',
  PASSWORD_LETTER_REGEX: 'password must contain 1 letter character at least!',
  PASSWORD_SPECIAL_CHAR_REGEX: 'password must contain 1 special character at least!',
} as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN_LENGTH_REGEX = /^.{8,}$/;
const PASSWORD_LETTER_REGEX = /[A-Za-z]/;
const PASSWORD_NUMBER_REGEX = /\d/;
const PASSWORD_SPECIAL_CHAR_REGEX = /[^A-Za-z0-9]/;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

export {
  AUTH_TASK_MANAGER_APP_CONTENTS,
  EMAIL_REGEX,
  ERROR_MESSAGES,
  PASSWORD_LETTER_REGEX,
  PASSWORD_MIN_LENGTH_REGEX,
  PASSWORD_NUMBER_REGEX,
  PASSWORD_REGEX,
  PASSWORD_SPECIAL_CHAR_REGEX,
  USERS,
};
