import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './pages/Dashboard/Dashboard'
import { FilesProvider } from './services/FilesContextType'

import { mockFiles } from "..//src//data/mockFiles";
import { ClickToComponent } from 'click-to-react-component'

function App() {
  return (
    <FilesProvider>
      <ClickToComponent 
      editor="vscode"/>
      <Dashboard />
    </FilesProvider>
  ) 
}
export default App
