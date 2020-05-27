import styled from 'styled-components';

export const StyledFullpageLoaderWrapper = styled.div`
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

export const StyledFullpageLoader = styled.div`
  border: 5px solid rgba(0, 0, 0, 0.05);
  border-radius: 50%;
  width: 50px;
  margin-top: 32px;
  height: 50px;
  animation: spinRight 0.75s linear infinite;

  & > div:first-of-type {
    width: 12px;
    height: 12px;
    background-color: #1890ff;
    border-radius: 50%;
    position: relative;
    left: 50%;
    top: -8px;
  }

  @keyframes spinRight {
    100% {
      transform: rotate(-360deg);
    }
  }
`;
