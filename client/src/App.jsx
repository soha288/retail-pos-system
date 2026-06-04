import { useState } from 'react'

import InventoryDashboard from './pages/InventoryDashboard'

import AdminDashboard from './pages/AdminDashboard'

import CashierDashboard from './pages/CashierDashboard'

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

        user.role ===
          'Inventory Manager'

          &&

          activePage ===
            'dashboard'

          &&

          <InventoryDashboard
            user={user}
            setActivePage={
              setActivePage
            }
          />

      }

      {

        user.role ===
          'System Administrator'

          &&

          activePage ===
            'dashboard'

          &&

          <AdminDashboard
            setActivePage={
              setActivePage
            }
          />

      }

      {

        user.role ===
          'Store Cashier'

          &&

          activePage ===
            'dashboard'

          &&

          <CashierDashboard
            setActivePage={
              setActivePage
            }
          />

      }

      {

        activePage ===
          'orders'

          &&

          <Orders
            setActivePage={
              setActivePage
            }
          />

      }

      {

        activePage ===
          'users'

          &&

          user.role ===
            'System Administrator'

          &&

          <Users />

      }

    </>

  )
}
