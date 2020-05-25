import styled from 'styled-components';

const StyledFullpageLoaderWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  & > h1 {
    margin-top: 4rem;
    font-size: 1.75rem;
  }
`;

export { StyledFullpageLoaderWrapper };
