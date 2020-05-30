import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  html {
    font-family: 'Source Sans Pro', sans-serif, -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
  }

  :root {
    --primary-color: #1890ff;
  }

  body {
    margin: 0;
    text-rendering: optimizeLegibility;
    font-family: 'Source Sans Pro', sans-serif, -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;
  }

  @media screen and (max-width: 48em) {
    html {
      font-size: 95%;
    }
  }

  @media screen and (max-width: 35em) {
    html {
      font-size: 91.5%;
    }
  }
`;
