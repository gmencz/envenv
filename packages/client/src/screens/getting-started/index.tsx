import React from 'react';
import { StyledGettingStarted } from './styles';
import { Card } from '../../components/card';
import { Paragraph } from '../../components/paragraph';
import { Title } from '../../components/title';
import { StyledCardLink } from '../../components/card/styles';

export const GettingStarted: React.FC = () => {
  return (
    <StyledGettingStarted>
      <h2>Getting started</h2>
      <Card
        icon={
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
          >
            <path d='M8 24l3-9h-9l14-15-3 9h9l-14 15z' />
          </svg>
        }
      >
        <Title>Integrate Envenv into your project</Title>
        <Paragraph>
          Add Envenv to any kind of project or technology in a matter of minutes
          and seamlessly integrate it into your development workflow.
        </Paragraph>
        <StyledCardLink to='/guides/integration'>
          Try it out
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='24'
            height='24'
            viewBox='0 0 24 24'
          >
            <path d='M21 12l-18 12v-24z' />
          </svg>
        </StyledCardLink>
      </Card>
    </StyledGettingStarted>
  );
};
