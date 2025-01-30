import {z} from 'zod';

export const usernameValidation = z.string()
.min(3,{message:"username must be atleast 3 characters long"})
.max(20,{message:"username must be atmost 20 characters long"})
.regex(/^[a-zA-Z0-9_]+$/, {message:"username must contain only letters, numbers and underscores"})

export const emailValidation = z.string().email({message:"invalid email"})
export const passwordValidation = z.string()
.min(6,{message:"password must be atleast 6 characters long"})

export const signupSchema = z.object({
  username: usernameValidation,
  email: emailValidation,
  password: passwordValidation,
});