import styled from 'styled-components';
import { LoaderProps } from '.';

export const StyledLoader = styled.div<LoaderProps>`
  border: 5px solid ${props => props.theme.dark.secondaryBackground};
  border-radius: 50%;
  width: ${({ size }) => size ?? '50px'};
  height: ${({ size }) => size ?? '50px'};
  animation: spinRight 0.75s linear infinite;

  & > div:first-of-type {
    width: 12px;
    height: 12px;
    background-color: ${props => props.theme.dark.primary};
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
