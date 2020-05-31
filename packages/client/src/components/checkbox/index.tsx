import React, { InputHTMLAttributes } from 'react';
import { StyledCheckbox } from './styles';

export interface CheckboxProps extends InputHTMLAttributes<any> {
  margin?: string;
  error?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  margin,
  error,
  ...rest
}) => {
  return (
    <StyledCheckbox error={error} className='checkbox bounce' margin={margin}>
      <input type='checkbox' {...rest} />
      <svg viewBox='0 0 21 21'>
        <polyline points='5 10.75 8.5 14.25 16 6'></polyline>
      </svg>
    </StyledCheckbox>
  );
};
