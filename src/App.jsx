import React from 'react'
import MainRoutes from './routes/mainRoute'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <div><MainRoutes/></div>
    </BrowserRouter>
  )
}

export default App