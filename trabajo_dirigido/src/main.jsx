import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { StyledEngineProvider } from '@mui/material'
import App from './App'
import Login_page from './pages/login_pages/Login_page.jsx'
import Register_form from './pages/login_pages/Register_form.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
        <Register_form />
    </StyledEngineProvider>
  </StrictMode>,
)
