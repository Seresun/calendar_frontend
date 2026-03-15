import { css } from '@emotion/react';

export const globalStyles = css`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    min-height: 100vh;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text',
      'Segoe UI', sans-serif;
    background-color: #f4f5f7;
    color: #172b4d;
  }

  #root {
    min-height: 100vh;
  }

  button,
  input {
    font-family: inherit;
  }
`;

