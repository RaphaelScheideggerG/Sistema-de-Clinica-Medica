import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'antd/dist/reset.css'
import ThemeWrapper from './theme/ThemeWrapper.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeWrapper />
  </StrictMode>,
)
