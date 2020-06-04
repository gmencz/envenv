import React from 'react';
import { StyledCard, StyledCardIcon, StyledCardContent } from './styles';

interface CardProps {
  icon: JSX.Element;
}

export const Card: React.FC<CardProps> = ({ icon, children }) => {
  return (
    <StyledCard>
      <StyledCardIcon>{icon}</StyledCardIcon>
      <StyledCardContent>{children}</StyledCardContent>
    </StyledCard>
  );
};
