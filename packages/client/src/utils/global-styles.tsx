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
`;
