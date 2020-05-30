import React from 'react';
import { AuthScreenInfoContainer } from '../styles';
import { FlexContainer } from '../../../components/flex-container';
import { Logo } from '../../../components/logo';
import { Title } from '../../../components/title';
import { Paragraph } from '../../../components/paragraph';
import { Formik } from 'formik';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../../../hooks/use-auth';
import { Input } from '../../../components/input';
import { Button } from '../../../components/button';

export const SignupLastStepScreen: React.FC = () => {
  const {
    signup,
    signup: { data, loading },
  } = useAuth();

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
        Fill in some of your details so we can get your account set up and
        others can know who you are.
      </Paragraph>
      <FlexContainer flexDirection='column'>
        <Formik
          initialValues={{
            username: '',
            email: '',
            name: '',
            password: '',
          }}
          onSubmit={async values => {
            await signup.execute({
              variables: { data: { ...values } },
            });
          }}
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
                label='Name'
              />
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                name='email'
                type='email'
                value={values.email}
                label='Email'
                margin='0 0 1.5rem'
              />
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                name='username'
                type='text'
                value={values.username}
                label='Username'
                margin='0 0 1.5rem'
              />
              <Input
                onChange={handleChange}
                onBlur={handleBlur}
                name='password'
                type='password'
                value={values.password}
                label='Password'
                margin='0 0 1.5rem'
              />
              <Button disabled={loading} type='submit' primary>
                Next
              </Button>
            </form>
          )}
        </Formik>
      </FlexContainer>
    </AuthScreenInfoContainer>
  );
};
