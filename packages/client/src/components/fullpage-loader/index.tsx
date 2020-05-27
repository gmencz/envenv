import React from 'react';
import { StyledFullpageLoaderWrapper, StyledFullpageLoader } from './styles';

export const FullpageLoader: React.FC = () => {
  return (
    <StyledFullpageLoaderWrapper>
      <StyledFullpageLoader aria-label='Loading...'>
        <div></div>
      </StyledFullpageLoader>
    </StyledFullpageLoaderWrapper>
  );
};
