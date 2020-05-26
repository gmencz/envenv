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

const StyledFullpageLoader = styled.div`
  border: 8px solid rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  width: 5em;
  height: 5em;
  animation: spinRight 1s linear infinite;

  & > div {
    width: 1.4em;
    height: 1.4em;
    background-color: #1890ff;
    border-radius: 50%;
    position: relative;
    left: 50%;
    top: -0.75rem;
  }

  @keyframes spinRight {
    100% {
      transform: rotate(-360deg);
    }
  }
`;

export { StyledFullpageLoaderWrapper, StyledFullpageLoader };
