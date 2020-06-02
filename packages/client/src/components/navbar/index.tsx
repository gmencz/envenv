import React from 'react';
import {
  StyledHeader,
  StyledNavbar,
  StyledNavbarLogoContainer,
} from './styles';
import { AppLink } from '../link';
import { Logo } from '../logo';
import { Title } from '../title';
import { FlexContainer } from '../flex-container';
import { Searchbar } from '../searchbar';
import { NotificationsBell } from '../notifications-bell';
import { ProfilePicture } from '../profile-picture';

export const NavbarLogo: React.FC = () => {
  return (
    <StyledNavbarLogoContainer>
      <AppLink to='/'>
        <FlexContainer alignItems='center'>
          <Logo size='46px' />
          <Title fontSize='1.15rem' component='h1' marginLeft='.75rem'>
            Envenv
          </Title>
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
            <li>
              <AppLink color='#4b4b4b' to='/pricing'>
                Pricing
              </AppLink>
            </li>
            <li>
              <AppLink color='#4b4b4b' to='/notifications'>
                <NotificationsBell />
              </AppLink>
            </li>
            <li>
              <ProfilePicture picture={picture} />
            </li>
          </ul>
        </div>
      </StyledNavbar>
    </StyledHeader>
  );
};
