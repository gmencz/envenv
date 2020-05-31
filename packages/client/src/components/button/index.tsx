import React, { ButtonHTMLAttributes } from 'react';
import {
  DefaultStyledButton,
  DefaultStyledButtonAnchor,
  StyledLink,
} from './styles';

interface Icon {
  src: string; // Imported asset via webpack, e.g (import Image from '../../assets/image.svg')
  alt: string;
  size?: string;
}

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<any>, 'style' | 'children'> {
  padding?: string;
  margin?: string;
  iconStart?: Icon;
  iconEnd?: Icon;
  component?: 'a' | 'button' | 'internalLink';
  href?: string;
  to?: string;
  primary?: boolean;
}

type OnlyCustomButtonProps = keyof Pick<ButtonProps, 'padding' | 'margin'>;

export const Button: React.FC<ButtonProps> = ({
  children,
  iconStart,
  iconEnd,
  to,
  component = 'button',
  ...props
}) => {
  // Extract this into its own hook since we reuse it in more components.
  const memoizedCustomStyles = React.useMemo(() => {
    const allowedProps: OnlyCustomButtonProps[] = ['padding', 'margin'];

    const filteredProps = Object.keys(props)
      .filter(propName =>
        allowedProps.includes(propName as OnlyCustomButtonProps)
      )
      .reduce(
        (accumulator, allowedPropName) => ({
          ...accumulator,
          [allowedPropName]:
            props[
              allowedPropName as keyof Pick<ButtonProps, 'padding' | 'margin'>
            ],
        }),
        {}
      );

    return filteredProps;
  }, [props]);

  if (component === 'a') {
    return (
      <DefaultStyledButtonAnchor style={{ ...memoizedCustomStyles }} {...props}>
        {iconStart && (
          <img
            src={iconStart.src}
            alt={iconStart.alt}
            style={{ width: iconStart.size, marginRight: '0.65rem' }}
          />
        )}
        {children}
        {iconEnd && (
          <img
            src={iconEnd.src}
            alt={iconEnd.alt}
            style={{ width: iconEnd.size, marginLeft: '0.65rem' }}
          />
        )}
      </DefaultStyledButtonAnchor>
    );
  }

  if (component === 'internalLink' && to) {
    return (
      <StyledLink to={to}>
        {iconStart && (
          <img
            src={iconStart.src}
            alt={iconStart.alt}
            style={{ width: iconStart.size, marginRight: '0.65rem' }}
          />
        )}
        {children}
        {iconEnd && (
          <img
            src={iconEnd.src}
            alt={iconEnd.alt}
            style={{ width: iconEnd.size, marginLeft: '0.65rem' }}
          />
        )}
      </StyledLink>
    );
  }

  return (
    <DefaultStyledButton style={{ ...memoizedCustomStyles }} {...props}>
      {iconStart && (
        <img
          src={iconStart.src}
          alt={iconStart.alt}
          style={{ width: iconStart.size, marginRight: '0.65rem' }}
        />
      )}
      {children}
      {iconEnd && (
        <img
          src={iconEnd.src}
          alt={iconEnd.alt}
          style={{ width: iconEnd.size, marginLeft: '0.65rem' }}
        />
      )}
    </DefaultStyledButton>
  );
};
