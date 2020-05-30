import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const DefaultStyledButton = styled.button`
  padding: 0.75rem;
  display: flex;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  align-items: center;
  color: rgb(34, 34, 34);
  font-size: 1rem;
  background-color: #fff;
  box-shadow: 0px 0px 2px 0px rgba(34, 34, 34, 1);
`;

export const DefaultStyledButtonAnchor = styled.a`
  padding: 0.75rem;
  display: flex;
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;
  border: none;
  align-items: center;
  font-weight: 600;
  color: rgb(34, 34, 34);
  font-size: 1rem;
  box-shadow: 0px 0px 2px 0px rgba(34, 34, 34, 1);
`;

export const StyledLink = styled(Link)`
  padding: 0.75rem;
  display: flex;
  border-radius: 4px;
  text-decoration: none;
  cursor: pointer;
  border: none;
  align-items: center;
  font-weight: 600;
  color: rgb(34, 34, 34);
  font-size: 1rem;
  box-shadow: 0px 0px 2px 0px rgba(34, 34, 34, 1);
`;
