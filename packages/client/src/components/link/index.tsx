import React from 'react';
import { StyledAppLink } from './styles';
import { CSSProperties } from 'styled-components';

export interface AppLinkProps extends Omit<CSSProperties, 'translate'> {
  to: string;
}

export const AppLink: React.FC<AppLinkProps> = ({ to, children, ...other }) => (
  <StyledAppLink to={to} {...other}>
    {children}
  </StyledAppLink>
);
