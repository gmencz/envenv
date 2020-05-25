import React from 'react';
import { StyledFullpageLoaderWrapper } from './styles';
import { Logo } from '../logo';

const FullpageLoader: React.FC = () => {
  return (
    <StyledFullpageLoaderWrapper>
      <Logo size='200px' />
      <h1>Processing zeroes and ones...</h1>
    </StyledFullpageLoaderWrapper>
  );
};

export { FullpageLoader };
