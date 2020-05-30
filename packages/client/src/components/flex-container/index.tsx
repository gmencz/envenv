import React, { CSSProperties } from 'react';

interface FlexContainerProps extends CSSProperties {
  component?:
    | 'div'
    | 'section'
    | 'main'
    | 'article'
    | 'aside'
    | 'header'
    | 'footer'
    | 'nav';
}

export const FlexContainer: React.FC<FlexContainerProps> = ({
  component = 'div',
  children,
  ...styles
}) => {
  return React.createElement(
    component,
    {
      style: { display: 'flex', ...styles },
    },
    children
  );
};
