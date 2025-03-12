import { ClerkProvider } from '@clerk/clerk-react'
import { StrictMode } from 'react'
import { BrowserRouter } from 'react-router-dom'

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import AuthProvider from '../provider/AuthProvider.tsx';
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  console.log("cannot find publishable key")
  throw new Error("Missing Publishable Key")
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>

    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </ClerkProvider>
  </StrictMode>,
)
