import styled, { css } from 'styled-components';

interface StyledSearchbarProps {
  active: boolean;
}

export const StyledSearchbarContainer = styled.div<StyledSearchbarProps>`
  padding-left: 10px;
  background-color: #fff;
  border: 1px solid #eaeaea;
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
      border: 1px solid var(--primary-color);
      box-shadow: 0px 0px 2.35px 0px rgba(24, 144, 255, 1);

      svg,
      path {
        fill: var(--primary-color);
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
  transition: all 200ms linear;
  width: ${({ active }) => (active ? '250px' : '180px')};
`;
