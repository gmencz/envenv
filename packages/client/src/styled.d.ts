import 'styled-components';

declare module 'styled-components' {
  export interface ThemeKind {
    background: string;
    secondaryBackground: string;
    primary: string;
    secondary: string;
    textPrimary: string;
    textSecondary: string;
    border: string;
    boxShadowPrimary: string;
    navbarBg: string;
    authHeroSvg: string;
    warning: string;
  }

  export interface DefaultTheme extends ThemeKind {}
}
