import React, { InputHTMLAttributes } from 'react';
import { DefaultStyledInput, DefaultStyledLabel } from './styles';
import { FlexContainer } from '../flex-container';

export interface InputProps
  extends Omit<InputHTMLAttributes<any>, 'style' | 'children'> {
  padding?: string;
  margin?: string;
  label?: string;
}

export const Input: React.FC<InputProps> = ({ label, id, ...props }) => {
  return (
    <FlexContainer flexDirection='column'>
      {label && <DefaultStyledLabel htmlFor={id}>{label}</DefaultStyledLabel>}
      <DefaultStyledInput id={id} {...props} />
    </FlexContainer>
  );
};
