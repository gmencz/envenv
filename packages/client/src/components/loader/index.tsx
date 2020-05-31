import React from 'react';
import { StyledLoader } from './styles';

export interface LoaderProps {
  size?: string;
}

export const Loader: React.FC<LoaderProps> = ({ size }) => (
  <StyledLoader size={size} aria-label='Loading...'>
    <div></div>
  </StyledLoader>
);
