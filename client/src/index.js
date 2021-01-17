import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.tsx'
import { AppContext } from './AppContext'
import { PreferenceWrapper } from './PreferenceWrapper'
import './index.css'

ReactDOM.render(
  <React.StrictMode>
    <PreferenceWrapper>
      <AppContext>
        <App />
      </AppContext>
    </PreferenceWrapper>
  </React.StrictMode>,
  document.getElementById('root')
)
