import React from 'react';
import { StyledProfilePictureWrapper, StyledProfilePicture } from './styles';

interface ProfilePictureProps {
  picture: string;
  setProfileDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ProfilePicture: React.FC<ProfilePictureProps> = ({
  picture,
  setProfileDropdownOpen,
}) => {
  return (
    <StyledProfilePictureWrapper
      role='button'
      onClick={() => setProfileDropdownOpen(true)}
    >
      <StyledProfilePicture src={picture as string} alt='My Profile' />
      <svg
        width='7'
        height='4'
        viewBox='0 0 7 4'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M6.91894 0.465431L3.72203 3.87633C3.71202 3.89076 3.71571 3.90932 3.70254 3.92221C3.6751 3.94877 3.64226 3.96939 3.60614 3.98271C3.57003 3.99603 3.53145 4.00176 3.49292 3.99953C3.45475 4.00144 3.41658 3.99555 3.38086 3.98224C3.34513 3.96893 3.31263 3.94848 3.28541 3.92221C3.27277 3.90932 3.27593 3.89128 3.26645 3.87736L0.0695431 0.465946C0.0226885 0.413811 -0.00212588 0.34617 0.000142918 0.276771C0.00241171 0.207373 0.0315935 0.141423 0.0817575 0.0923256C0.131922 0.0432281 0.199304 0.014667 0.27021 0.0124465C0.341117 0.0102259 0.410227 0.0345127 0.463495 0.0803709L3.49345 3.31446L6.52446 0.0798555C6.55033 0.0545383 6.58103 0.0344555 6.61483 0.0207539C6.64863 0.00705234 6.68485 2.66761e-10 6.72143 0C6.75802 -2.66761e-10 6.79424 0.00705234 6.82804 0.0207539C6.86183 0.0344555 6.89254 0.0545383 6.91841 0.0798555C6.94428 0.105173 6.9648 0.135228 6.9788 0.168307C6.99279 0.201386 7 0.236839 7 0.272643C7 0.308447 6.99279 0.3439 6.9788 0.376979C6.9648 0.410058 6.94428 0.440114 6.91841 0.465431H6.91894Z'
          fill='#4B4B4B'
        />
      </svg>
    </StyledProfilePictureWrapper>
  );
};
