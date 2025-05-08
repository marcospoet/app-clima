import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { WheaterApp } from './wheaterApp'
import './styles/wheaterApp.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <WheaterApp />
  </StrictMode>,
)
