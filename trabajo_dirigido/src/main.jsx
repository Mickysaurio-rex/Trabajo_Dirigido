import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { StyledEngineProvider } from '@mui/material'
import App from './App'
import Register_form from './pages/Register_form.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
     <App />
    </StyledEngineProvider>
  </StrictMode>,
)
