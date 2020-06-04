import React from 'react';
import { AuthScreenInfoContainer } from '../styles';
import { Logo } from '../../../components/logo';
import { Title } from '../../../components/title';
import { FlexContainer } from '../../../components/flex-container';
import { Paragraph } from '../../../components/paragraph';
import { Button } from '../../../components/button';
import GithubIcon from '../../../assets/github-icon.svg';
import EmailIcon from '../../../assets/email-icon.svg';
import { AppLink } from '../../../components/link';

export const SignupScreen: React.FC = () => {
  return (
    <AuthScreenInfoContainer>
      <FlexContainer margin='0 0 3rem 0' alignItems='center'>
        <Logo margin='0 .75rem 0 0' size='30px' />
        <Title>Envenv</Title>
      </FlexContainer>
      <h2>Let's improve your organization's collaboration experience.</h2>
      <Paragraph className='xl'>
        Create an account and get the tools that allow your organization to
        synchronize and share critical information, environment secrets and more
        without having to worry about security.
      </Paragraph>
      <FlexContainer className='responsive' marginBottom='2rem'>
        <Button
          component='a'
          href='http://localhost:8080/oauth/auth/github?operation=signup'
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
          >
            <path d='M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z' />
          </svg>
          Continue with Github
        </Button>
        <Button to='/register' component='internalLink'>
          <svg width='24' height='24' xmlns='http://www.w3.org/2000/svg'>
            <path d='M24 21h-24v-18h24v18zm-23-16.477v15.477h22v-15.477l-10.999 10-11.001-10zm21.089-.523h-20.176l10.088 9.171 10.088-9.171z' />
          </svg>
          Continue with Email
        </Button>
      </FlexContainer>
      <Paragraph>
        Already have an account? <AppLink to='/login'>Log in.</AppLink>
      </Paragraph>
    </AuthScreenInfoContainer>
  );
};
