import styled from 'styled-components';
import { FlexContainerProps } from '.';

const spreadStyles = (props: FlexContainerProps) => ({
  ...props,
  children: undefined,
});

export const StyledFlexContainer = styled.div<FlexContainerProps>`
  display: flex;

  & > a:not(:last-of-type) {
    margin-right: 1rem;
  }

  & > button:not(:last-of-type) {
    margin-right: 1rem;
  }

  &.responsive {
    @media screen and (max-width: 45em) {
      flex-direction: column;

      & > :first-of-type {
        margin-right: 0;
        margin-bottom: 1rem;
      }
    }
  }

  ${props => spreadStyles(props)}
`;
