import {z} from 'zod';
import { emailValidation, passwordValidation} from '@/schemas/signupSchema';

export const loginSchema = z.object({
  email: emailValidation,
  password: passwordValidation,
});