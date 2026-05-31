import { useState } from 'react'

import Dashboard from './pages/Dashboard'

import Login from './pages/Login'

export default function App() {

  const [user, setUser] =
    useState(null)

  return (

    user

      ?

      <Dashboard user={user} />

      :

      <Login setUser={setUser} />

  )
}
