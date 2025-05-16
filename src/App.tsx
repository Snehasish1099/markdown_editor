import React from 'react'
import './App.css'
import HomePage from './components/HomePage'
import { DarkModeProvider } from './utils/DarkModeContext'

function App() {

  return (
    <React.Fragment>
      <DarkModeProvider>
        <HomePage />
      </DarkModeProvider>
    </React.Fragment>
  )
}

export default App
