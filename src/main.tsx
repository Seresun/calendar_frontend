import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider, Global } from '@emotion/react';
import App from './App.tsx';
import { theme } from './styles/theme';
import { globalStyles } from './styles/globalStyles';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <Global styles={globalStyles} />
      <App />
    </ThemeProvider>
  </StrictMode>,
);
