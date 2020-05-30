import React from 'react';
import { Redirect } from 'react-router-dom';
import { useAuth } from '../../../hooks/use-auth';
import {
  AuthScreenContainer,
  AuthScreenHero,
  AuthScreenInfoContainer,
  AuthScreenInfoOuterContainer,
} from '../styles';
import { Logo } from '../../../components/logo';
import { Title } from '../../../components/title';
import { FlexContainer } from '../../../components/flex-container';
import { Paragraph } from '../../../components/paragraph';
import { Button } from '../../../components/button';

export const SignupScreen: React.FC = () => {
  const {
    signup,
    signup: { data },
  } = useAuth();

  if (data?.signup.__typename === 'SuccessfulSignup') {
    return <Redirect to='/' />;
  }

  return (
    <AuthScreenContainer>
      <AuthScreenInfoOuterContainer>
        <AuthScreenInfoContainer>
          {signup.error && <p>loading...</p>}
          <FlexContainer margin='0 0 3rem 0' alignItems='center'>
            <Logo margin='0 .75rem 0 0' size='30px' />
            <Title fontSize='1.15rem' component='h1'>
              Envenv
            </Title>
          </FlexContainer>
          <Title component='h2' fontSize='1.6rem'>
            Let's improve your organization's collaboration experience.
          </Title>
          <Paragraph fontSize='1.2rem' lineHeight='1.5' marginBottom='2rem'>
            Create an account and get the tools that allow your organization to
            synchronize and share critical information, environment secrets and
            more without having to worry about security.
          </Paragraph>
          <FlexContainer>
            <Button margin='0 1rem 0 0'>Continue with Github</Button>
            <Button>Continue with Email</Button>
          </FlexContainer>
        </AuthScreenInfoContainer>
      </AuthScreenInfoOuterContainer>
      <AuthScreenHero />
    </AuthScreenContainer>
  );
};
