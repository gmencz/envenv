import { object, string, date } from 'yup';

export const newUserValidation = object().shape({
  username: string()
    .min(3, 'That username is too short!')
    .max(30, 'That username is too long!')
    .required('Please, tell us your username!'),
  name: string()
    .min(3, 'That name is too short!')
    .max(60, 'That name is too long!')
    .required('Please, tell us your name!'),
  email: string()
    .email('That email is invalid!')
    .required('Please, tell us your email so we can stay in touch!'),
  password: string()
    .min(6, 'That password is too short!')
    .max(255, 'That password is too long!')
    .required('Please, provide a password!'),
  role: string().required('Role is required'),
  birthDate: date().required('Please, tell us when you were born!'),
});
