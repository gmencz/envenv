import React from 'react';
import { AuthScreenInfoContainer } from '../styles';
import { FlexContainer } from '../../../components/flex-container';
import { Logo } from '../../../components/logo';
import { Title } from '../../../components/title';
import { Paragraph } from '../../../components/paragraph';
import { Formik } from 'formik';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../../../hooks/use-auth';
import { Input, ErrorIcon } from '../../../components/input';
import { Button } from '../../../components/button';
import { Loader } from '../../../components/loader';
import { signupValidationSchema } from '../../../validation/signup';
import { StyledInputError } from '../../../components/input/styles';
import { useUnexpectedTypename } from '../../../hooks/use-unexpected-typename';

export const SignupLastStepScreen: React.FC = () => {
  const {
    signup,
    signup: { data, loading: signingUp },
  } = useAuth();
  const { failedOperationMessage } = useUnexpectedTypename(
    data,
    'SuccessfulSignup'
  );

  if (data?.signup.__typename === 'SuccessfulSignup') {
    return <Redirect to='/' />;
  }

  return (
    <AuthScreenInfoContainer>
      <FlexContainer margin='0 0 3rem 0' alignItems='center'>
        <Logo margin='0 .75rem 0 0' size='30px' />
        <Title fontSize='1.15rem' component='h1'>
          Envenv
        </Title>
      </FlexContainer>
      <Title component='h2' fontSize='1.6rem'>
        Set up your account.
      </Title>
      <Paragraph fontSize='1.2rem' lineHeight='1.5' marginBottom='2rem'>
        Fill in your details so others can know who you are and we can start
        making your life easier.
      </Paragraph>
      <FlexContainer flexDirection='column'>
        <Formik
          initialValues={{
            username: '',
            email: '',
            name: '',
            password: '',
          }}
          onSubmit={values => {
            signup.execute({
              variables: { data: { ...values } },
            });
          }}
          validationSchema={signupValidationSchema}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                name='name'
                type='text'
                value={values.name}
                margin='0 0 1.5rem'
                placeholder='John Doe'
                label='Name'
                error={touched.name ? errors.name : undefined}
              />
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                name='email'
                type='email'
                value={values.email}
                label='Email'
                margin='0 0 1.5rem'
                placeholder='example@domain.com'
                error={touched.email ? errors.email : undefined}
              />
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                name='username'
                type='text'
                value={values.username}
                label='Username'
                margin='0 0 1.5rem'
                error={touched.username ? errors.username : undefined}
              />
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                name='password'
                type='password'
                value={values.password}
                label='Password'
                margin='0 0 1.5rem'
                error={touched.password ? errors.password : undefined}
              />
              <Button
                disabled={signingUp}
                type='submit'
                primary
                margin='0 0 1.5rem'
              >
                {signingUp ? <Loader size='12px' /> : 'Next'}
              </Button>
              {failedOperationMessage && (
                <StyledInputError>
                  <ErrorIcon />
                  <strong>{failedOperationMessage}</strong>
                </StyledInputError>
              )}
            </form>
          )}
        </Formik>
      </FlexContainer>
    </AuthScreenInfoContainer>
  );
};
