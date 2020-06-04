import React from 'react';
import { DefaultStyledParagraph } from './styles';

export interface ParagraphProps {
  className?: string;
}

export const Paragraph: React.FC<ParagraphProps> = ({
  children,
  className,
}) => {
  return (
    <DefaultStyledParagraph className={className}>
      {children}
    </DefaultStyledParagraph>
  );
};
