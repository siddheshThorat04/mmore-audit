import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { initTheme } from './theme.js'
import './styles.css'
initTheme() // apply the saved / ?brand= colour before the first paint
createRoot(document.getElementById('root')).render(<App />)
