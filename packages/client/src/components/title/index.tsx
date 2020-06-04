import React from 'react';
import styled from 'styled-components';

interface TitleProps {
  className?: string;
}

const StyledTitle = styled.h1`
  color: ${({ theme }) => theme.textPrimary};

  &.xl {
    font-size: 1.55rem;
  }
`;

export const Title: React.FC<TitleProps> = ({ children, className }) => {
  return <StyledTitle className={className}>{children}</StyledTitle>;
};
