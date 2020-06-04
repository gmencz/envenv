import React from 'react';
import {
  StyledAppLink,
  StyledExternalAppLink,
  StyledAppNavLink,
} from './styles';
import { CSSProperties } from 'styled-components';

export interface AppLinkProps extends Omit<CSSProperties, 'translate'> {
  to: string;
  external?: boolean;
  navLink?: boolean;
}

export const AppLink: React.FC<AppLinkProps> = ({
  to,
  children,
  external = false,
  navLink = false,
  ...other
}) => {
  if (external) {
    return <StyledExternalAppLink href={to}>{children}</StyledExternalAppLink>;
  }

  if (navLink) {
    return (
      <StyledAppNavLink to={to} {...other}>
        {children}
      </StyledAppNavLink>
    );
  }

  return (
    <StyledAppLink to={to} {...other}>
      {children}
    </StyledAppLink>
  );
};
