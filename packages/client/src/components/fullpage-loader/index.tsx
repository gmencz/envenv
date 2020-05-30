import React from 'react';
import { StyledFullpageLoaderWrapper } from './styles';
import { Loader } from '../loader';

export const FullpageLoader: React.FC = () => {
  return (
    <StyledFullpageLoaderWrapper>
      <Loader />
    </StyledFullpageLoaderWrapper>
  );
};
