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
import { Title } from '../title';
import { ProfileDropdown } from '../profile-dropdown';
import { useOnClickOutside } from '../../hooks/use-on-click-outside';

export const NavbarLogo: React.FC = () => {
  return (
    <StyledNavbarLogoContainer>
      <AppLink to='/'>
        <FlexContainer alignItems='center'>
          <Logo size='35px' />
          <Title>Envenv</Title>
        </FlexContainer>
      </AppLink>
    </StyledNavbarLogoContainer>
  );
};

interface NavbarProps {
  picture: string | null | undefined;
}

export const Navbar: React.FC<NavbarProps> = ({ picture }) => {
  const [profileDropdownOpen, setProfileDropdownOpen] = React.useState(false);
  const profileDropdownRef = React.useRef<HTMLDivElement>(null);
  useOnClickOutside(profileDropdownRef, () => {
    setProfileDropdownOpen(false);
  });

  return (
    <StyledHeader>
      <StyledNavbar>
        <NavbarLogo />
        <div>
          <Searchbar />
          <ul>
            <div>
              <li>
                <AppLink navLink to='/pricing'>
                  Pricing
                </AppLink>
              </li>
              <li>
                <AppLink external to='https://docs.envenv.es/'>
                  Docs
                </AppLink>
              </li>
              <li>
                <AppLink navLink to='/explore'>
                  Explore
                </AppLink>
              </li>
            </div>
            <div>
              <li>
                <AppLink to='/notifications'>
                  <NotificationsBell />
                </AppLink>
              </li>
              <li>
                {/* On click this opens a dropdown with some options */}
                <ProfilePicture
                  setProfileDropdownOpen={setProfileDropdownOpen}
                  picture={picture || ''}
                />
                <ProfileDropdown
                  open={profileDropdownOpen}
                  reference={profileDropdownRef}
                />
              </li>
            </div>
          </ul>
        </div>
      </StyledNavbar>
    </StyledHeader>
  );
};
