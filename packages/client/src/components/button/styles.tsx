import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

export const DefaultStyledButton = styled.button<{ primary?: boolean }>`
  padding: 0.85rem;
  display: flex;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  align-items: center;
  color: ${props => props.theme.dark.textSecondary};
  font-size: 1.1rem;
  background-color: ${props => props.theme.dark.background};
  font-family: 'Source Sans Pro', sans-serif, -apple-system, BlinkMacSystemFont,
    Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
  transition: all 200ms ease-in-out;

  ${({ primary }) =>
    primary &&
    css`
      background-color: ${props => props.theme.dark.primary};
      color: white;
      width: 100%;
      justify-content: center;

      &:hover {
        opacity: 0.7;
      }

      &:disabled {
        background-color: #d8d8d8;
        cursor: not-allowed;
      }
    `}
`;

export const DefaultStyledButtonAnchor = styled.a`
  padding: 0.75rem;
  display: flex;
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;
  border: none;
  align-items: center;
  font-weight: 600;
  color: ${props => props.theme.dark.textSecondary};
  font-size: 1rem;
  box-shadow: ${props => props.theme.dark.border};
`;

export const StyledLink = styled(Link)`
  padding: 0.75rem;
  display: flex;
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;
  border: none;
  align-items: center;
  font-weight: 600;
  color: ${props => props.theme.dark.textSecondary};
  font-size: 1rem;
  box-shadow: ${props => props.theme.dark.border};
`;
