import styled from 'styled-components';

export const StyledNavbarLogoContainer = styled.div`
  flex-basis: 230px;
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
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  align-items: center;

  ul {
    flex-grow: 1;
    list-style-type: none;
    margin: 0;
  }
`;
