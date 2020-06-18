import { object, string, boolean, reach } from 'yup';
import { signupValidationSchema } from './signup';

export const loginValidationSchema = object().shape({
  username: reach(signupValidationSchema, 'username'),
  password: reach(signupValidationSchema, 'password'),
});
