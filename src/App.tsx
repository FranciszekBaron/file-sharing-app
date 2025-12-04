import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './pages/Dashboard/Dashboard'
import { FileProvider } from './services/FilesContextType'

import { mockFiles } from "..//src//data/mockFiles";

function App() {
  return (
    <FileProvider>
      <Dashboard/>
    </FileProvider>
  ) 
}

export default App
