import { useState } from 'react'

import './styles/theme.css'
import './App.css'
import AppRouter from './AppRouter'
import ThemeToggle from './components/ThemeToggle'

function App() {
  return (
    <>
      <div style={{ position: 'absolute', top: 14, right: 14, zIndex: 60 }}>
        <ThemeToggle />
      </div>
      <AppRouter />
    </>
  )
}

export default App
