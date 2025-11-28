import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Dashboard from './pages/Dashboard/Dashboard'

import { mockFiles } from "..//src//data/mockFiles";

function App() {
  return <Dashboard items={mockFiles}/>  // ZMIANA: bez Fragment
}

export default App
