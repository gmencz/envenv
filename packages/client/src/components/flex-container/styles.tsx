import styled from 'styled-components';

export const StyledFlexContainer = styled.div`
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
`;
