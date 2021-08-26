// system
import React from 'react'
import { BrowserRouter } from 'react-router-dom'

// hooks
import { useRoutes } from '../hooks/routes.hook.jsx'
//import request from '../hooks/request.js'

// styles
import '../styles/Default.module.css'

// component
function App() {
  const routes = useRoutes(false)

  //const login = request('/api/login', 'POST', {login: 'el', pass: '123'})
  //console.log(login)
  //const createUser = await request('/api/user', 'POST', {login: 'el', pass: '123'})
  //console.log('createUser:', createUser)

  //const getUser = await request('/api/user/1')
  //console.log('getUser:', getUser)

  //const updateUser = await request('/api/user/24', 'PUT', {login: 'el', pass: 'asd', links: ['https://xbeee.com/', 'https://google.com/']})
  //console.log('updateUser:', updateUser)

  //const deleteUser = await request('/api/user/24', 'DELETE')
  //console.log('deleteUser:', deleteUser)
  /*
  request('/api/login', 'POST', {login: 'el', pass: '123'}).then(login => {
    console.log('login:', login)
  })
  */
  return (
    <BrowserRouter>
      <div>
        {routes}
      </div>
    </BrowserRouter>
  )
}

export default App
