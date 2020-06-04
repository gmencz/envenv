import styled, { css } from 'styled-components';
import { NavLink } from 'react-router-dom';

interface StyledProfileDropdownProps {
  open: boolean;
}

export const StyledProfileDropdown = styled.div<StyledProfileDropdownProps>`
  opacity: 0;
  pointer-events: none;
  position: absolute;
  width: 200px;
  transition: all 0.1s cubic-bezier(0.3, 0, 0, 1.3) 0s;
  min-height: 250px;
  display: flex;
  flex-direction: column;
  top: 30px;
  right: 0;
  transform: scale(0.8) translateY(-10%);
  background-color: ${props => props.theme.background};
  box-shadow: ${props => props.theme.boxShadowPrimary};
  border-radius: 3px;

  ${({ open }) =>
    open &&
    css`
      opacity: 1;
      pointer-events: auto;
      transform: none;
    `}

  &.centered {
    align-items: center;
    justify-content: center;
  }

  & > button {
    padding: 12px;
    display: flex;
    align-items: center;
    color: ${props => props.theme.textSecondary};
    transition: none;
    font-size: 0.9rem;
    border-radius: 0;
    background-color: transparent;
    outline: none;

    svg {
      margin-right: 10px;

      &,
      path {
        fill: currentColor;
      }
    }

    &:hover {
      background-color: ${props => props.theme.secondaryBackground};
    }
  }

  & > a {
    &:first-of-type {
      font-weight: bold;
      color: ${props => props.theme.textPrimary};
    }
  }
`;

export const StyledDivider = styled.div`
  height: 1px;
  background-color: ${props => props.theme.secondaryBackground};
`;

export const StyledProfileDropdownImage = styled.div`
  padding: 12px;
  display: flex;
  align-items: center;

  p {
    margin: 0;
    margin-bottom: 5px;
  }

  img {
    width: 40px;
    height: 40px;
    margin-right: 12px;
  }

  a {
    font-size: 0.899rem;
    color: ${props => props.theme.primary};

    &:hover {
      opacity: 0.9;
    }
  }
`;

export const ProfileDropdownLink = styled(NavLink)`
  padding: 12px;
  display: flex;
  align-items: center;
  color: ${props => props.theme.textSecondary};
  font-size: 0.9rem;
  text-decoration: none;

  svg {
    margin-right: 10px;

    &,
    path {
      fill: currentColor;
    }
  }

  &:hover,
  &.active {
    background-color: ${props => props.theme.secondaryBackground};
  }
`;
