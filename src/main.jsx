import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

import Listapais from './Paises/paisesList.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Listapais />
  </React.StrictMode>,
)
