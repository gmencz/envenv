import React from 'react';
import { useFormik } from 'formik';
import {
  useSignUpMutation,
  useLoginOnClientMutation,
} from '../../../generated/graphql';
import { Redirect } from 'react-router-dom';

export const SignupScreen: React.FC = () => {
  const [signup, { loading, data }] = useSignUpMutation();
  const [loginOnClient] = useLoginOnClientMutation();
  const { values, handleChange, handleSubmit } = useFormik({
    initialValues: {
      username: '',
      password: '',
      email: '',
      name: '',
    },
    onSubmit: async values => {
      signup({
        variables: {
          data: {
            email: values.email,
            name: values.name,
            password: values.password,
            username: values.username,
          },
        },
      });
    },
  });

  if (data?.signup.__typename === 'SuccessfulSignup') {
    localStorage.setItem('csrf-token', data.signup.csrfToken);
    loginOnClient({ variables: { csrfToken: data.signup.csrfToken } });
    return <Redirect to='/' />;
  }

  return (
    <>
      {loading && <p>loading...</p>}
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='email'
          onChange={handleChange}
          value={values.email}
          placeholder='email'
        />
        <input
          type='text'
          name='name'
          onChange={handleChange}
          value={values.name}
          placeholder='name'
        />
        <input
          type='text'
          name='username'
          onChange={handleChange}
          value={values.username}
          placeholder='username'
        />
        <input
          type='password'
          name='password'
          onChange={handleChange}
          value={values.password}
          placeholder='password'
        />
        <button type='submit'>Submit</button>
      </form>
    </>
  );
};
