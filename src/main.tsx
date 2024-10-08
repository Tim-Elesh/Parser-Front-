import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { CssVarsProvider } from '@mui/joy/styles';
import theme from './utils/theme.ts'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CssVarsProvider theme={theme}>
      <App />
    </CssVarsProvider>
  </StrictMode>,
)
