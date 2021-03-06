import styled from 'styled-components';
import { ParagraphProps } from '.';

export const DefaultStyledParagraph = styled.p<ParagraphProps>`
  color: ${props => props.theme.textSecondary};
  line-height: 1.5;
`;
