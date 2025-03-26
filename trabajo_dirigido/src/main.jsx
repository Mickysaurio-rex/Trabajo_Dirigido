import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { StyledEngineProvider } from '@mui/material'
import './index.css'
import App from './App'
import { AuthProvider } from '../src/context/AuthContext'
import { CategoryProvider } from '../src/context/CategoryContext'
import { ReservaProvider } from './context/ReservaContext'
import { ReservationProvider } from './context/ReservationContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StyledEngineProvider injectFirst>
      <AuthProvider>
        <CategoryProvider>
          <ReservaProvider>
            <ReservationProvider>
              <App />
            </ReservationProvider>
          </ReservaProvider>
        </CategoryProvider>
      </AuthProvider>
    </StyledEngineProvider>
  </StrictMode>
)
