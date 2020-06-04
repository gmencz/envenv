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
  color: ${props => props.theme.dark.primary};
  text-decoration: none;
  ${props => spreadStyles(props)}
`;

export const StyledExternalAppLink = styled.a<Omit<AppLinkProps, 'to'>>`
  color: ${props => props.theme.dark.primary};
  text-decoration: none;
  ${props => spreadStyles(props)}
`;

export const StyledAppNavLink = styled(NavLink)<AppLinkProps>`
  color: ${props => props.theme.dark.primary};
  text-decoration: none;
  ${props => spreadStyles(props)}
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -10px;
    background-color: #000;
  }

  &.active {
    color: #000;

    &::after {
      width: 100%;
      height: 1px;
    }
  }
`;
