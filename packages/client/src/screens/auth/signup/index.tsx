import React from 'react';
import { Formik } from 'formik';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../../../hooks/use-auth';

export const SignupScreen: React.FC = () => {
  const {
    signup,
    signup: { data },
  } = useAuth();

  if (data?.signup.__typename === 'SuccessfulSignup') {
    return <Redirect to='/' />;
  }

  return (
    <>
      {signup.inFlight && <p>loading...</p>}
      <Formik
        initialValues={{
          username: '',
          password: '',
          email: '',
          name: '',
        }}
        onSubmit={values => {
          signup.execute({
            variables: {
              data: {
                email: values.email,
                name: values.name,
                password: values.password,
                username: values.username,
              },
            },
          });
        }}
      >
        {({ values, handleChange, handleSubmit, isSubmitting }) => (
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
            <button disabled={isSubmitting} type='submit'>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </>
  );
};
