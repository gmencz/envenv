import styled from 'styled-components';
import { ParagraphProps } from '.';

const spreadStyles = (props: ParagraphProps) => ({ ...props });

export const DefaultStyledParagraph = styled.p<ParagraphProps>`
  color: #333;
  ${props => spreadStyles(props)}
`;
