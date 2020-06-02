import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { ButtonProps } from '.';

const spreadStyles = (props: Omit<ButtonProps, 'label' | 'autoFocus'>) => ({
  ...props,
  children: undefined,
  to: undefined,
});

export const DefaultStyledButton = styled.button<{ primary?: boolean }>`
  padding: 0.75rem;
  display: flex;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  align-items: center;
  color: rgb(34, 34, 34);
  font-size: 1.1rem;
  background-color: #fff;
  font-family: 'Source Sans Pro', sans-serif, -apple-system, BlinkMacSystemFont,
    Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
  transition: background-color 200ms ease-in-out;

  &:hover {
    background-color: #eee;
  }

  ${({ primary }) =>
    primary &&
    css`
      background-color: var(--primary-color);
      color: white;
      width: 100%;
      justify-content: center;

      &:hover {
        background-color: #006dd1;
      }

      &:disabled {
        background-color: #d8d8d8;
        cursor: not-allowed;
      }
    `}

  ${(props: any) => spreadStyles(props) as any}
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
  color: rgb(34, 34, 34);
  font-size: 1rem;
  box-shadow: 0px 0px 2px 0px rgba(34, 34, 34, 1);
  ${(props: any) => spreadStyles(props) as any}
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
  color: rgb(34, 34, 34);
  font-size: 1rem;
  box-shadow: 0px 0px 2px 0px rgba(34, 34, 34, 1);
  ${props => spreadStyles(props as any) as any}
`;
