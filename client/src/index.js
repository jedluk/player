import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.tsx'
import { AppContext } from './AppContext'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <AppContext>
      <App />
    </AppContext>
  </React.StrictMode>,
  document.getElementById('root')
)
