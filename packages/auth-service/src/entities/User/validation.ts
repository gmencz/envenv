import { object, string } from 'yup';

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
    .email('Please, provide a valid email!')
    .required('Please, tell us your email so we can stay in touch!'),
  password: string()
    .min(8, 'That password is too short!')
    .max(255, 'That password is too long!')
    .required('Please, provide a password!'),
  picture: string().url('That profile picture is invalid!'),
});
