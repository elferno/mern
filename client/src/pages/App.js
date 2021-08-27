// system
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

// hooks
import { useAuth } from '../hooks/auth.hook.jsx'
import { useRoutes } from '../hooks/routes.hook.jsx'

// context
import { AuthContext } from '../context/AuthContext.jsx'

// styles
import '../styles/Default.module.css'

// component
function App() {
  const auth = useAuth()
  const routes = useRoutes(auth.isAuth)

  return (
      <AuthContext.Provider value={auth}>
        <BrowserRouter>
           {routes}
        </BrowserRouter>
      </AuthContext.Provider>
  )
}

export default App
