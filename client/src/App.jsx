import { useState } from 'react'

import Dashboard from './pages/Dashboard'

import Login from './pages/Login'

export default function App() {

  const [isLoggedIn, setIsLoggedIn] =
    useState(false)

  return (

    isLoggedIn

      ?

      <Dashboard />

      :

      <Login
        setIsLoggedIn={setIsLoggedIn}
      />

  )
}
