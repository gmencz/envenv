import React, { CSSProperties } from 'react';
import { DefaultStyledParagraph } from './styles';

export interface ParagraphProps extends Omit<CSSProperties, 'translate'> {}

export const Paragraph: React.FC<ParagraphProps> = ({ children, ...other }) => {
  return <DefaultStyledParagraph {...other}>{children}</DefaultStyledParagraph>;
};
