import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const StyledCard = styled.article`
  display: flex;
  background-color: ${props => props.theme.dark.background};
  padding: 32px;
  border-radius: 5px;
  transition: box-shadow 0.1s ease 0s, transform 0.1s ease 0s;
  box-shadow: ${props => props.theme.dark.border};
`;

export const StyledCardIcon = styled.div`
  background-color: ${props => props.theme.dark.secondaryBackground};
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
    fill: ${props => props.theme.dark.textPrimary};
  }
`;

export const StyledCardContent = styled.div`
  margin-left: 24px;
`;

export const StyledCardLink = styled(Link)`
  text-decoration: none;
  color: ${props => props.theme.dark.primary};
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
