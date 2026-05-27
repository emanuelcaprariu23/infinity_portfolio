import { z } from 'zod';

const loginSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
  rememberMe: z.boolean().optional(),
});

const registerSchema = z
  .object({
    email: z.email('Invalid email address'),
    password: z.string().min(1, 'Password is required').regex(/R/, { error: '' }),
    rePassword: z.string().min(1, 'Re-Password is required'),
  })
  .refine(data => data.password === data.rePassword, {
    error: `Password don't match!`,
    path: ['form'],
  });

type LoginDataT = z.infer<typeof loginSchema>;
type RegisterDataT = z.infer<typeof registerSchema>;

export { loginSchema, registerSchema };
export type { LoginDataT, RegisterDataT };
