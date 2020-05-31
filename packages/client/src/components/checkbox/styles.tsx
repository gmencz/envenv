import styled from 'styled-components';
import { CheckboxProps } from '.';

export const StyledCheckbox = styled.label<CheckboxProps>`
  --background: #fff;
  --border: #d1d6ee;
  --border-hover: #bbc1e1;
  --border-active: #1890ff;
  --tick: #fff;

  position: relative;
  margin: ${({ margin }) => margin ?? undefined};

  input,
  svg {
    width: 20px;
    height: 20px;
    display: block;
  }

  input {
    -webkit-appearance: none;
    -moz-appearance: none;
    position: relative;
    outline: none;
    background: var(--background);
    border: none;
    margin: 0;
    padding: 0;
    cursor: pointer;
    border-radius: 5px;
    transition: box-shadow 0.3s;
    box-shadow: ${({ error }) =>
      error
        ? 'inset 0 0 0 var(--s, 1px) var(--warning-color)'
        : 'inset 0 0 0 var(--s, 1px) var(--b, var(--border))'};
    &:hover {
      --s: 2px;
      --b: var(--border-hover);
    }
    &:checked {
      --b: var(--border-active);
    }
  }

  svg {
    pointer-events: none;
    fill: none;
    stroke-width: 2px;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke: var(--stroke, var(--border-active));
    position: absolute;
    top: 0;
    left: 0;
    width: 21px;
    height: 21px;
    transform: scale(var(--scale, 1)) translateZ(0);
  }

  &.bounce {
    --stroke: var(--tick);
    input {
      &:checked {
        --s: 11px;
        & + svg {
          animation: bounce 0.4s linear forwards 0.2s;
        }
      }
    }
    svg {
      --scale: 0;
    }
  }

  @keyframes bounce {
    50% {
      transform: scale(1.2);
    }
    75% {
      transform: scale(0.9);
    }
    100% {
      transform: scale(1);
    }
  }
`;
