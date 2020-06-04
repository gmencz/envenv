import React from 'react';
import styled from 'styled-components';

interface TitleProps {}

const StyledTitle = styled.h1`
  color: ${({ theme }) => theme.dark.textPrimary};
`;

export const Title: React.FC<TitleProps> = ({ children }) => {
  return <StyledTitle>{children}</StyledTitle>;
};
