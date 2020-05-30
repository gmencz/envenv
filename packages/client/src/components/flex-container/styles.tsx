import styled from 'styled-components';
import { FlexContainerProps } from '.';

const spreadStyles = (props: FlexContainerProps) => ({ ...props });

export const StyledFlexContainer = styled.div<FlexContainerProps>`
  display: flex;

  & > :first-of-type {
    margin-right: 1rem;
  }

  &.responsive {
    @media screen and (max-width: 730px) {
      flex-direction: column;

      & > :first-of-type {
        margin-right: 0;
        margin-bottom: 1rem;
      }
    }
  }

  ${props => spreadStyles(props)}
`;
