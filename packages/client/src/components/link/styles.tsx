import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { AppLinkProps } from '.';

const spreadStyles = (props: AppLinkProps) => ({
  ...props,
  children: undefined,
});

export const StyledAppLink = styled(Link)<AppLinkProps>`
  color: var(--primary-color);
  text-decoration: none;
  ${props => spreadStyles(props)}
`;
