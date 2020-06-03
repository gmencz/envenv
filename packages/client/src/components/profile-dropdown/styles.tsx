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
  background-color: #fff;
  box-shadow: rgba(0, 0, 0, 0.176) 0px 6px 12px;
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
    color: #4b4b4b;
    transition: none;
    font-size: 0.9rem;

    svg {
      margin-right: 10px;
    }

    &:hover {
      background-color: rgb(245, 245, 245);
    }
  }

  & > a {
    &:first-of-type {
      font-weight: bold;
      color: #000;
    }
  }
`;

export const StyledDivider = styled.div`
  height: 1px;
  background-color: #eaeaea;
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
    transition: color 150ms ease-in-out;

    &:hover {
      color: #0e6abf;
    }
  }
`;

export const ProfileDropdownLink = styled(NavLink)`
  padding: 12px;
  display: flex;
  align-items: center;
  color: #4b4b4b;
  font-size: 0.9rem;
  text-decoration: none;

  svg {
    margin-right: 10px;
  }

  &:hover,
  &.active {
    background-color: rgb(245, 245, 245);
  }
`;
