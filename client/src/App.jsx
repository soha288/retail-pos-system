import { useState } from 'react'

import InventoryDashboard from './pages/InventoryDashboard'

import AdminDashboard from './pages/AdminDashboard'

import CashierDashboard from './pages/CashierDashboard'

import Login from './pages/Login'

import Orders from './pages/Orders'

import Users from './pages/Users'
import ProtectedRoute
from './components/ProtectedRoute'
export default function App() {

  const storedUser =
  localStorage.getItem(
    'user'
  )

const storedToken =
  localStorage.getItem(
    'token'
  )

const [user, setUser] =
  useState(

    storedUser &&
    storedToken

      ?

      JSON.parse(storedUser)

      :

      null
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

  activePage ===
    'inventory'

    &&

    <ProtectedRoute

      allowedRoles={[

        'System Administrator',

        'Inventory Manager'
      ]}

    >

      <InventoryDashboard

        user={user}

        setActivePage={
          setActivePage
        }
      />

    </ProtectedRoute>
}

      {

        user.role ===
          'Store Cashier'

          &&

          activePage ===
            'dashboard'

          &&

          <CashierDashboard
  user={user}
  setActivePage={
    setActivePage
  }
/>

      }
{

  activePage ===
    'orders'

    &&

    <ProtectedRoute

      allowedRoles={[

        'System Administrator',

        'Inventory Manager',

        'Store Cashier'
      ]}

    >

      <Orders
        setActivePage={
          setActivePage
        }
      />

    </ProtectedRoute>
}

      {

  activePage ===
    'users'

    &&

    <ProtectedRoute

      allowedRoles={[
        'System Administrator'
      ]}

    >

      <Users
        setActivePage={
          setActivePage
        }
      />

    </ProtectedRoute>
}

    </>

  )
}
