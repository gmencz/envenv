import React, { ButtonHTMLAttributes } from 'react';
import { DefaultStyledButton } from './styles';

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<any>, 'style' | 'children'> {
  padding?: string;
  margin?: string;
}

type OnlyCustomButtonProps = keyof Pick<ButtonProps, 'padding' | 'margin'>;

export const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  const memoizedCustomStyles = React.useMemo(() => {
    const allowedProps: OnlyCustomButtonProps[] = ['padding', 'margin'];

    const filteredProps = Object.keys(props)
      .filter(propName =>
        allowedProps.includes(propName as OnlyCustomButtonProps)
      )
      .reduce(
        (accumulator, allowedPropName) => ({
          ...accumulator,
          [allowedPropName]: props[allowedPropName as keyof ButtonProps],
        }),
        {}
      );

    return filteredProps;
  }, [props]);

  return (
    <DefaultStyledButton style={{ ...memoizedCustomStyles }} {...props}>
      {children}
    </DefaultStyledButton>
  );
};
