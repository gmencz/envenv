import styled from 'styled-components';
import { InputProps } from '.';

export const DefaultStyledInput = styled.input<
  Pick<InputProps, 'padding' | 'margin'>
>`
  padding: ${({ padding }) => padding ?? '.7rem .65rem'};
  margin: ${({ margin }) => margin};
  font-size: 1rem;
  outline: none;
  box-sizing: border-box;
  border: 1px solid rgba(0, 0, 0, 0.2);
  border-radius: 4px;
  transition: all 250ms ease-in-out;
  font-family: 'Source Sans Pro', sans-serif, -apple-system, BlinkMacSystemFont,
    Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;

  &:focus {
    border: 1px solid var(--primary-color);
    box-shadow: 0px 0px 2px 0px rgba(24, 144, 255, 1);
  }
`;

export const DefaultStyledLabel = styled.label`
  margin-bottom: 0.65rem;
  color: #333;
  font-weight: 600;
  font-family: 'Source Pro Sans', sans-serif;
`;
