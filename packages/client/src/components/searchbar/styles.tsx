import styled, { css } from 'styled-components';

interface StyledSearchbarProps {
  active: boolean;
}

export const StyledSearchbarContainer = styled.div<StyledSearchbarProps>`
  padding-left: 10px;
  background-color: ${({ theme }) => theme.background};
  box-shadow: ${({ theme }) => theme.border};
  display: flex;
  align-items: center;
  border-radius: 5px;
  transition: all 200ms ease-in-out;

  svg,
  path {
    transition: fill 200ms ease-in-out;
  }

  ${({ active }) =>
    active &&
    css`
      box-shadow: ${({ theme }) => `${theme.primary} 0px 0px 0px 1px`};

      svg,
      path {
        fill: ${({ theme }) => theme.primary};
      }
    `}
`;

export const StyledSearchbar = styled.input<StyledSearchbarProps>`
  font-family: 'Source Sans Pro', sans-serif, -apple-system, BlinkMacSystemFont,
    Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;
  font-size: 1rem;
  border: none;
  padding: 10px;
  border-radius: 5px;
  outline: none;
  background-color: ${({ theme }) => theme.background};
  transition: all 200ms linear;
  width: ${({ active }) => (active ? '250px' : '180px')};
  color: ${({ theme }) => theme.textPrimary};
`;
