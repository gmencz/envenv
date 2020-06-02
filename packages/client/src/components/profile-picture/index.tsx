import React from 'react';
import { StyledProfilePictureWrapper, StyledProfilePicture } from './styles';

interface ProfilePictureProps {
  picture: string;
}

export const ProfilePicture: React.FC<ProfilePictureProps> = ({ picture }) => {
  return (
    <StyledProfilePictureWrapper>
      <StyledProfilePicture src={picture} alt='My Profile' />
    </StyledProfilePictureWrapper>
  );
};
