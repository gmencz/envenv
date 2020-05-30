import React, { CSSProperties } from 'react';
import { StyledFlexContainer } from './styles';

export interface FlexContainerProps extends Omit<CSSProperties, 'translate'> {
  className?: string;
}

export const FlexContainer: React.FC<FlexContainerProps> = ({
  children,
  className,
  ...other
}) => {
  return (
    <StyledFlexContainer className={className} {...other}>
      {children}
    </StyledFlexContainer>
  );
};
