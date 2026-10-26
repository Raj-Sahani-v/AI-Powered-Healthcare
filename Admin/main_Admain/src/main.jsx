import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import {App} from './App.jsx'
import { ContextApiData } from './ContextApi/ContextApiData.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextApiData>
      <App />
    </ContextApiData>
  </StrictMode>,
)
