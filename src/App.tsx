import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './pages/Dashboard/Dashboard'
import { FilesProvider } from './services/FilesContextType'

import { mockFiles } from "..//src//data/mockFiles";
import { ClickToComponent } from 'click-to-react-component'
import { NavigationProvider } from './services/NavigationContext'
import { Routes,Route } from 'react-router-dom'

function App() {
  return (
    <NavigationProvider>
      <FilesProvider>
        <Dashboard/>
    </FilesProvider>
    </NavigationProvider>
  
  ) 
}
export default App
