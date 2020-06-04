import styled, { css } from 'styled-components';
import AuthHeroDecoration from '../../assets/auth-hero-decoration1.svg';

export const AuthScreenContainer = styled.main`
  display: flex;
`;

export const AuthScreenHero = styled.div`
  min-height: 100vh;
  flex-grow: 1;
  background-color: ${props => props.theme.primary};
  background-image: ${props => props.theme.authHeroSvg};
  background-attachment: fixed;
  background-size: cover;
  background-attachment: fixed;
  background-size: cover;

  &::after {
    content: '';
    display: block;
    min-height: 100vh;
    background-image: url(${AuthHeroDecoration});
  }
`;

interface AuthScreenInfoOuterContainerProps {
  centerOnSmHeights?: boolean;
  fullScreenOnSm?: boolean;
  neverCenterVertically?: boolean;
}

export const AuthScreenInfoOuterContainer = styled.section<
  AuthScreenInfoOuterContainerProps
>`
  flex-basis: 66.666667%;
  box-sizing: border-box;
  display: flex;
  padding: 6rem 1.75rem 0;
  flex-direction: column;
  background-color: ${props => props.theme.background};

  ${({ centerOnSmHeights }) =>
    centerOnSmHeights &&
    css`
      @media screen and (max-height: 56em) {
        padding: 0.75rem 1.25rem;
        justify-content: center;
      }
    `}
  @media screen and (max-width: 30em) {
    flex-basis: ${({ fullScreenOnSm }) => (fullScreenOnSm ? '100%' : '76%')};
    justify-content: ${({ neverCenterVertically }) =>
      neverCenterVertically ? 'flex-start' : 'center'};
    padding: 1.75rem;
  }

  @media screen and (max-width: 23.5em) {
    padding: 1.25rem;
  }
`;

export const AuthScreenInfoContainer = styled.div`
  max-width: 500px;
  margin: 0 auto;
  width: 100%;

  .logo-container {
    h1 {
      font-size: 1.15rem;
    }

    svg {
      margin-right: 0.75rem;
    }

    + h2 {
      font-size: 1.6rem;
    }

    ~ p {
      &:first-of-type {
        font-size: 1.2rem;
        margin-bottom: 2rem;
      }

      &:last-of-type {
        margin-top: 2.5rem;
        font-size: 1rem;
      }
    }

    &.last-step {
      ~ p {
        &:first-of-type {
          font-size: 1.2rem;
          margin-bottom: 2rem;
        }

        &:last-of-type {
          margin-top: 0;
          font-size: 1.2rem;
        }
      }
    }
  }

  label.checkbox ~ span {
    color: ${props => props.theme.textPrimary};
  }

  button[type='submit'] {
    margin-bottom: 1rem;
  }

  & > div {
    & > svg {
      &,
      path {
        fill: ${props => props.theme.primary};
      }
    }
  }

  h2 {
    color: ${props => props.theme.textPrimary};

    + p {
      margin-bottom: 2rem;
    }
  }

  a {
    svg {
      margin-right: 0.75rem;
    }
  }
`;
