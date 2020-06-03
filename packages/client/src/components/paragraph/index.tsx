import React from 'react';
import { DefaultStyledParagraph } from './styles';

export interface ParagraphProps {}

export const Paragraph: React.FC<ParagraphProps> = ({ children }) => {
  return <DefaultStyledParagraph>{children}</DefaultStyledParagraph>;
};
