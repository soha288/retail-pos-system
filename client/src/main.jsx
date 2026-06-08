import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Toaster }
from 'react-hot-toast'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <Toaster
  position="top-right"

  toastOptions={{

    duration: 3000,

    style: {
      background: '#ffffff',
      color: '#0f172a',
      borderRadius: '16px',
      padding: '16px',
      fontWeight: '600'
    },

    success: {
      style: {
        border:
          '2px solid #22c55e'
      }
    },

    error: {
      style: {
        border:
          '2px solid #ef4444'
      }
    }
  }}
/>
  </StrictMode>,
)
