import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ThemeProvider } from './lib/ThemeContext'

if (import.meta.env.PROD) {
  console.log  = () => {};
  console.warn = () => {};
  // Keep console.error live so real runtime errors surface in prod monitoring
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
