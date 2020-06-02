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

export const Navbar: React.FC = () => {
  return (
    <StyledHeader>
      <StyledNavbar>
        <NavbarLogo />
        <ul>
          <li>
            <input type='text' />
          </li>
        </ul>
      </StyledNavbar>
    </StyledHeader>
  );
};
