import React, { CSSProperties } from 'react';

interface ParagraphProps extends CSSProperties {}

export const Paragraph: React.FC<ParagraphProps> = ({
  children,
  ...styles
}) => {
  return <p style={{ color: '#333', ...styles }}>{children}</p>;
};
