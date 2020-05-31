import styled, { css } from 'styled-components';
import { InputProps } from '.';

const spreadStyles = (props: Omit<InputProps, 'label' | 'autoFocus'>) => ({
  ...props,
  children: undefined,
});

export const DefaultStyledInput = styled.input<
  Omit<InputProps, 'label' | 'autoFocus'>
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

  ${({ error }) =>
    error &&
    css`
      box-shadow: 0px 0px 2.35px 0px red;
    `}

  &:focus {
    border: 1px solid var(--primary-color);
    box-shadow: 0px 0px 2.35px 0px rgba(24, 144, 255, 1);
  }

  ${(props: any) => spreadStyles(props) as any}
`;

export const DefaultStyledLabel = styled.label`
  color: #333;
  font-weight: 600;
  margin-right: 1rem;
  font-size: 1.075rem;
`;

export const StyledInputError = styled.div`
  display: flex;
  align-items: center;
  color: red;
  position: relative;

  strong {
    margin-left: 26px;
  }

  svg {
    fill: red;
    width: 18px;
    position: absolute; /* using absolute so the icon doesn't displace the above elements */
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
`;
