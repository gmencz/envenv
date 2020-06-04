import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const StyledMainSidebar = styled.nav`
  flex-basis: 230px;
  padding-left: 4px;
  margin-right: 1.5rem;

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;

    li {
      margin-bottom: 20px;
    }

    a {
      text-decoration: none;
      color: ${props => props.theme.textSecondary};
      display: flex;
      align-items: center;

      svg {
        margin-right: 10px;
      }

      &.active {
        color: ${props => props.theme.primary};
      }

      path {
        fill: currentColor;
      }
    }
  }
`;

export const StyledMainSidebarLink = styled(NavLink)``;
