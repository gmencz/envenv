import styled from 'styled-components';

export const StyledProfilePictureWrapper = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  svg,
  path {
    fill: ${props => props.theme.dark.textSecondary};
  }
`;

export const StyledProfilePicture = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 7px;
`;
