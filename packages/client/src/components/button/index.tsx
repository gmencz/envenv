import React, { ButtonHTMLAttributes } from 'react';
import {
  DefaultStyledButton,
  DefaultStyledButtonAnchor,
  StyledLink,
} from './styles';
import { CSSProperties } from 'styled-components';

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<any>, 'style' | 'children'>,
    Omit<CSSProperties, 'translate'> {
  fit?: boolean;
  padding?: string;
  margin?: string;
  component?: 'a' | 'button' | 'internalLink';
  href?: string;
  to?: string;
  primary?: boolean;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  to,
  component = 'button',
  fit,
  ...props
}) => {
  if (component === 'a') {
    return (
      <DefaultStyledButtonAnchor {...props}>
        {children}
      </DefaultStyledButtonAnchor>
    );
  }

  if (component === 'internalLink' && to) {
    return <StyledLink to={to}>{children}</StyledLink>;
  }
  if (fit) {
    return (
      <DefaultStyledButton {...props} className='fit' fit>
        {children}
      </DefaultStyledButton>
    );
  }
  return <DefaultStyledButton {...props}>{children}</DefaultStyledButton>;
};
