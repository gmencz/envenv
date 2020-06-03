import styled from 'styled-components';

export const StyledNavbarLogoContainer = styled.div`
  flex-basis: 230px;
  display: flex;
  margin-right: 1.5rem;

  + div {
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }
`;

export const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  border-bottom: 1px solid #eaeaea;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 82px;
  background-color: rgba(255, 255, 255, 0.85);
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-grow: 1;

    li:not(:last-of-type) {
      margin-right: 40px;
    }

    & > div {
      display: flex;
    }
  }
`;
