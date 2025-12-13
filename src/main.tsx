import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes> {/* 👈 Definiujesz możliwe ścieżki */}
          <Route path="/" element={<App />} />
          <Route path="/drive/:view" element={<App />} />
          <Route path="/drive/:view/:folderId" element={<App />} />
        </Routes>
    </BrowserRouter>
  </StrictMode>,
)
