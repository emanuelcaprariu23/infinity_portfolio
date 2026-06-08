import {
  ERROR_MESSAGES,
  PASSWORD_ERROR_MESSAGES,
  PASSWORD_LETTER_REGEX,
  PASSWORD_SPECIAL_CHAR_REGEX,
  PASSWORD_STRENGTH,
} from '@/pages/Auth/constants';
import z from 'zod';

const loginSchema = z.object({
  email: z.email(ERROR_MESSAGES.EMAIL_NOT_VALID),
  password: z.string().min(1, PASSWORD_ERROR_MESSAGES.REQUIRED),
  rememberMe: z.boolean().optional(),
});

const passwordStrengthSchema = z.string().superRefine((value, ctx) => {
  if (!value) {
    ctx.addIssue({ code: 'custom', message: PASSWORD_ERROR_MESSAGES.REQUIRED });
    return;
  }

  if (value.length < 8) {
    ctx.addIssue({ code: 'custom', message: PASSWORD_STRENGTH.WEAK });
    return;
  }

  const hasLetter = PASSWORD_LETTER_REGEX.test(value);
  const hasSpecialChar = PASSWORD_SPECIAL_CHAR_REGEX.test(value);

  if (!hasLetter || !hasSpecialChar) {
    ctx.addIssue({ code: 'custom', message: PASSWORD_STRENGTH.MEDIUM });
  }
});

const registerSchema = z
  .object({
    email: z.email(ERROR_MESSAGES.EMAIL_NOT_VALID),
    password: passwordStrengthSchema,
    rePassword: z.string().min(8, PASSWORD_ERROR_MESSAGES.MIN_LENGTH_REGEX),
  })
  .refine(data => data.password === data.rePassword, {
    error: PASSWORD_ERROR_MESSAGES.DON_T_MATCH,
    path: ['form'],
  });

type LoginDataT = z.infer<typeof loginSchema>;
type RegisterDataT = z.infer<typeof registerSchema>;

export { loginSchema, registerSchema };
export type { LoginDataT, RegisterDataT };
