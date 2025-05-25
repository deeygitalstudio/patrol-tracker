import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './prestyled.css'
import './index.css'
import './w3.css'


import { HashRouter } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(
 <HashRouter>
       <App />
   </HashRouter>
)
