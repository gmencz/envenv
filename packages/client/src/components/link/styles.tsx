import styled from 'styled-components';
import { Link, NavLink } from 'react-router-dom';
import { AppLinkProps } from '.';

const spreadStyles = (
  props: Omit<AppLinkProps, 'external' | 'to' | 'navLink'>
) => ({
  ...props,
  children: undefined,
  to: undefined,
});

export const StyledAppLink = styled(Link)<AppLinkProps>`
  color: ${props => props.theme.primary};
  text-decoration: none;
  ${props => spreadStyles(props)}
`;

export const StyledExternalAppLink = styled.a<Omit<AppLinkProps, 'to'>>`
  color: ${props => props.theme.primary};
  text-decoration: none;
  ${props => spreadStyles(props)}
`;

export const StyledAppNavLink = styled(NavLink)<AppLinkProps>`
  color: ${props => props.theme.primary};
  text-decoration: none;
  ${props => spreadStyles(props)}
  position: relative;
`;
