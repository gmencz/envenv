import styled from 'styled-components';

export const StyledNotificationsBellContainer = styled.div`
  position: relative;
  margin-top: 9px;

  svg,
  path {
    fill: ${props => props.theme.textSecondary};
  }
`;

export const Notification = styled.div`
  width: 17px;
  height: 17px;
  border-radius: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.725rem;
  position: absolute;
  top: -10px;
  right: -10px;
  color: #fff;
  background-color: ${props => props.theme.primary};
`;
