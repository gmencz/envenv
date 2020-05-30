import React, { CSSProperties } from 'react';

interface TitleProps extends CSSProperties {
  component?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export const Title: React.FC<TitleProps> = ({
  component = 'h1',
  children,
  ...styles
}) => {
  return React.createElement(
    component,
    {
      style: { color: '#222', ...styles },
    },
    children
  );
};
