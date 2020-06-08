import { object, string, boolean } from 'yup';

export const loginValidationSchema = object().shape({
  username: string()
    .min(3, 'That username is too short!')
    .max(30, 'That username is too long!')
    .required('Please, tell us your username!'),
  password: string()
    .min(8, 'That password is too short!')
    .max(255, 'That password is too long!')
    .required('Please, provide a password!'),
});
