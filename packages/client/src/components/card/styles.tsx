import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledCard = styled.article`
  display: flex;
  background-color: #fff;
  padding: 32px;
  border-radius: 5px;
  transition: box-shadow 0.1s ease 0s, transform 0.1s ease 0s;
  box-shadow: rgb(226, 226, 226) 0px 0px 0px 1px;

  &:hover {
    box-shadow: rgb(226, 226, 226) 0px 0px 0px 1px,
      rgba(34, 36, 38, 0.15) 0px 2px 8px 0px;
  }
`;

export const StyledCardIcon = styled.div`
  background-color: rgb(236, 236, 236);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 50px;
  max-height: 50px;
  min-width: 50px;
  min-height: 50px;

  svg {
    width: 25px;
    height: 25px;
  }
`;

export const StyledCardContent = styled.div`
  margin-left: 24px;
`;

export const StyledCardLink = styled(Link)`
  text-decoration: none;
  color: rgb(255, 62, 0);
  display: flex;
  align-items: center;

  svg {
    fill: currentColor;
    width: 10px;
    height: 10px;
    margin-left: 5px;
    margin-top: 2px;
  }
`;
