import { useState } from 'react'

import Dashboard from './pages/Dashboard'

import Login from './pages/Login'

import Orders from './pages/Orders'

import Users from './pages/Users'

export default function App() {

  const [user, setUser] =
    useState(
      JSON.parse(
        localStorage.getItem('user')
      )
    )

  const [activePage, setActivePage] =
    useState('dashboard')

  if (!user) {

    return (
      <Login
        setUser={setUser}
      />
    )
  }

  return (

    <>

      {

        activePage === 'dashboard'

          &&

          <Dashboard
            user={user}
            setActivePage={setActivePage}
          />

      }

      {

        activePage === 'orders'

          &&

          <Orders
  setActivePage={
    setActivePage
  }
/>

      }

      {

        activePage === 'users'

          &&

          <Users />

      }

    </>

  )
}
