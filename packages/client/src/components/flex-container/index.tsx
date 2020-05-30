import React, { CSSProperties } from 'react';
import { StyledFlexContainer } from './styles';

interface FlexContainerProps extends CSSProperties {
  wrapOnSmallerDevices?: boolean;
  className?: string;
}

export const FlexContainer: React.FC<FlexContainerProps> = ({
  children,
  className,
  wrapOnSmallerDevices,
  ...styles
}) => {
  return (
    <StyledFlexContainer className={className} style={{ ...styles }}>
      {children}
    </StyledFlexContainer>
  );
};
