import { z } from 'zod';
import { ERROR_MESSAGES, PASSWORD_LETTER_REGEX, PASSWORD_SPECIAL_CHAR_REGEX } from './constants';

const loginSchema = z.object({
  email: z.email(ERROR_MESSAGES.EMAIL_NOT_VALID),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

const registerSchema = z
  .object({
    email: z.email(ERROR_MESSAGES.EMAIL_NOT_VALID),
    password: z
      .string()
      .min(8, ERROR_MESSAGES.PASSWORD_MIN_LENGTH_REGEX)
      .regex(PASSWORD_LETTER_REGEX, { error: ERROR_MESSAGES.PASSWORD_LETTER_REGEX })
      .regex(PASSWORD_SPECIAL_CHAR_REGEX, { error: ERROR_MESSAGES.PASSWORD_SPECIAL_CHAR_REGEX }),
    rePassword: z.string().min(8, ERROR_MESSAGES.PASSWORD_MIN_LENGTH_REGEX),
  })
  .refine(data => data.password === data.rePassword, {
    error: ERROR_MESSAGES.PASSWORDS_DON_T_MATCH,
    path: ['form'],
  });

type LoginDataT = z.infer<typeof loginSchema>;
type RegisterDataT = z.infer<typeof registerSchema>;

export { loginSchema, registerSchema };
export type { LoginDataT, RegisterDataT };
