import React from 'react';
import { StyledFullpageLoaderWrapper } from './styles';
import { Logo } from '../logo';

const FullpageLoader: React.FC = () => {
  return (
    <StyledFullpageLoaderWrapper>
      <Logo size='200px' />
    </StyledFullpageLoaderWrapper>
  );
};

export { FullpageLoader };
