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
  padding: 0.85rem;
  transition: all 250ms ease-in-out;
  font-family: 'Source Sans Pro', sans-serif, -apple-system, BlinkMacSystemFont,
    Segoe UI, Helvetica, Arial, sans-serif, Apple Color Emoji, Segoe UI Emoji;

  ${({ error }) =>
    error &&
    css`
      box-shadow: 0px 0px 2.35px 0px ${props => props.theme.warning};
      border: 1px solid ${props => props.theme.warning};
    `}

  &:focus {
    border: 1px solid ${props => props.theme.primary};
    box-shadow: 0px 0px 2.35px 0px ${props => props.theme.primary};
  }

  ${(props: any) => spreadStyles(props) as any}
`;

export const DefaultStyledLabel = styled.label`
  color: ${props => props.theme.textPrimary};
  font-weight: 600;
  margin-right: 1rem;
  font-size: 1.075rem;
`;

export const StyledInputError = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.warning};
  position: relative;

  strong {
    margin-left: 26px;
  }

  svg {
    fill: ${props => props.theme.warning};
    width: 18px;
    position: absolute; /* using absolute so the icon doesn't displace the above elements */
    left: 0;
    top: 50%;
    transform: translateY(-50%);
  }
`;
