import React from 'react';
import {
  StyledHeader,
  StyledNavbar,
  StyledNavbarLogoContainer,
} from './styles';
import { AppLink } from '../link';
import { Logo } from '../logo';
import { FlexContainer } from '../flex-container';
import { Searchbar } from '../searchbar';
import { NotificationsBell } from '../notifications-bell';
import { ProfilePicture } from '../profile-picture';

export const NavbarLogo: React.FC = () => {
  return (
    <StyledNavbarLogoContainer>
      <AppLink to='/'>
        <FlexContainer alignItems='center'>
          <Logo />
        </FlexContainer>
      </AppLink>
    </StyledNavbarLogoContainer>
  );
};

interface NavbarProps {
  picture: string;
}

export const Navbar: React.FC<NavbarProps> = ({ picture }) => {
  return (
    <StyledHeader>
      <StyledNavbar>
        <NavbarLogo />
        <div>
          <Searchbar />
          <ul>
            <div>
              <li>
                <AppLink color='#4b4b4b' to='/pricing'>
                  Pricing
                </AppLink>
              </li>
              <li>
                <AppLink color='#4b4b4b' to='/support'>
                  Help & Support
                </AppLink>
              </li>
            </div>
            <div>
              <li>
                <AppLink color='#4b4b4b' to='/notifications'>
                  <NotificationsBell />
                </AppLink>
              </li>
              <li>
                {/* On click this opens a dropdown with some options */}
                <ProfilePicture picture={picture} />
              </li>
            </div>
          </ul>
        </div>
      </StyledNavbar>
    </StyledHeader>
  );
};
