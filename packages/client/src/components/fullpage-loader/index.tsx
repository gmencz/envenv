import React from 'react';
import { StyledFullpageLoaderWrapper, StyledFullpageLoader } from './styles';

const FullpageLoader: React.FC = () => {
  return (
    <StyledFullpageLoaderWrapper>
      <StyledFullpageLoader>
        <div></div>
      </StyledFullpageLoader>
    </StyledFullpageLoaderWrapper>
  );
};

export { FullpageLoader };
