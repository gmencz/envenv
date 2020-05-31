import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AppLinkProps } from '.';

const spreadStyles = (props: Omit<AppLinkProps, 'external' | 'to'>) => ({
  ...props,
  children: undefined,
});

export const StyledAppLink = styled(Link)<AppLinkProps>`
  color: var(--primary-color);
  text-decoration: none;
  ${props => spreadStyles(props)}
`;

export const StyledExternalAppLink = styled.a<Omit<AppLinkProps, 'to'>>`
  color: var(--primary-color);
  text-decoration: none;
  ${props => spreadStyles(props)}
`;
