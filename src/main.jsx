import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Fade out and remove splash screen after React has mounted
const splash = document.getElementById('splash');
if (splash) {
  splash.classList.add('fade-out');
  setTimeout(() => splash.remove(), 600);
}
