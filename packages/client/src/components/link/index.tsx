import React from 'react';
import { StyledAppLink, StyledExternalAppLink } from './styles';
import { CSSProperties } from 'styled-components';

export interface AppLinkProps extends Omit<CSSProperties, 'translate'> {
  to: string;
  external?: boolean;
}

export const AppLink: React.FC<AppLinkProps> = ({
  to,
  children,
  external = false,
  ...other
}) =>
  external ? (
    <StyledExternalAppLink href={to}>{children}</StyledExternalAppLink>
  ) : (
    <StyledAppLink to={to} {...other}>
      {children}
    </StyledAppLink>
  );
