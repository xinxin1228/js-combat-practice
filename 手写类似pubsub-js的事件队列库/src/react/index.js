import React from 'react'
import ReactDom from 'react-dom/client'
import App from './App'
import './app.less'

const root = ReactDom.createRoot(document.querySelector('#react'))

root.render(<App />)
