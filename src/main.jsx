import { StrictMode } from 'react'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CartProvider} from './context/CartContext.jsx'
import { AuthProvider } from './context/AuthContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <ThemeProvider>
      <CartProvider>
      <App />
      </CartProvider>
    </ThemeProvider>
    </AuthProvider>
  </StrictMode>,
)
