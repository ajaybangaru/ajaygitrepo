import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import QuerySlider from './components/QuerySlider.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QuerySlider />
  </StrictMode>,
)
