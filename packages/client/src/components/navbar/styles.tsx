import styled from 'styled-components';

export const StyledNavbarLogoContainer = styled.div`
  flex-basis: 230px;
  display: flex;

  h1 {
    color: ${({ theme }) => theme.dark.textPrimary} !important;
    font-size: 1rem;
    margin-left: 12px;
  }

  + div {
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }

  svg,
  path {
    fill: ${({ theme }) => theme.dark.primary} !important;
  }

  @media screen and (max-width: 48em) {
    h1 {
      display: none;
    }

    + div {
      margin-left: 24px;
    }
  }
`;

export const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  box-shadow: ${({ theme }) => theme.dark.border};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 82px;
  background-color: rgba(0, 0, 0, 0.85);
`;

export const StyledNavbar = styled.nav`
  max-width: 1056px;
  width: 100%;
  padding: 0 1.5rem;
  margin: 0 auto;
  display: flex;
  align-items: center;

  ul {
    list-style-type: none;
    margin: 0;
    margin-left: 40px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;

    li {
      position: relative;

      & > a {
        white-space: nowrap;
        color: ${({ theme }) => theme.dark.textSecondary};
      }
    }

    li:not(:last-of-type) {
      margin-right: 40px;
    }

    & > div {
      display: flex;
      align-items: center;

      &:first-of-type {
        margin-right: 40px;
      }
    }
  }
`;
