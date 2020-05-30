import React from 'react';
import { StyledAppLink } from './styles';

interface AppLinkProps {
  to: string;
}

export const AppLink: React.FC<AppLinkProps> = ({ to, children }) => (
  <StyledAppLink to={to}>{children}</StyledAppLink>
);
