import React from 'react'
import { ReactDOM } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { FilterProvider } from './components/FilterContext.tsx'


createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FilterProvider>
    <App />
    </FilterProvider>
  </React.StrictMode>,
)
