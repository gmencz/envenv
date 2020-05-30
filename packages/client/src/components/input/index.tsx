import React, { InputHTMLAttributes } from 'react';
import { DefaultStyledInput, DefaultStyledLabel } from './styles';
import { FlexContainer } from '../flex-container';

export interface InputProps
  extends Omit<InputHTMLAttributes<any>, 'style' | 'children'> {
  padding?: string;
  margin?: string;
  label?: string;
}

type OnlyInputCustomProps = keyof Pick<InputProps, 'padding' | 'margin'>;

export const Input: React.FC<InputProps> = ({ label, id, ...props }) => {
  const memoizedCustomStyles = React.useMemo(() => {
    const allowedProps: OnlyInputCustomProps[] = ['padding', 'margin'];

    const filteredProps = Object.keys(props)
      .filter(propName =>
        allowedProps.includes(propName as OnlyInputCustomProps)
      )
      .reduce(
        (accumulator, allowedPropName) => ({
          ...accumulator,
          [allowedPropName]:
            props[allowedPropName as keyof Omit<InputProps, 'id' | 'label'>],
        }),
        {}
      );

    return filteredProps;
  }, [props]);

  return (
    <FlexContainer flexDirection='column'>
      {label && <DefaultStyledLabel htmlFor={id}>{label}</DefaultStyledLabel>}
      <DefaultStyledInput
        style={{ ...memoizedCustomStyles }}
        id={id}
        {...props}
      />
    </FlexContainer>
  );
};
