import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRoute from './router.tsx'
import { AuthContextProvider } from './context/AuthContext.tsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
          <AppRoute />
      </AuthContextProvider>
    </BrowserRouter>
  </StrictMode>
);

