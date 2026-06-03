import { useState } from 'react'

export default function Login({
  setUser
}) {

  const [email, setEmail] =
    useState('manager@pos.com')

  const [password, setPassword] =
    useState('manager123')

  const handleLogin = (e) => {

    e.preventDefault()

    const users = [

      {
        email: 'admin@pos.com',
        password: 'admin123',
        role: 'System Administrator',
        name: 'Admin User'
      },

      {
        email: 'manager@pos.com',
        password: 'manager123',
        role: 'Inventory Manager',
        name: 'Inventory Manager'
      },

      {
        email: 'cashier@pos.com',
        password: 'cashier123',
        role: 'Store Cashier',
        name: 'Cashier User'
      }

    ]

    const matchedUser =
      users.find(
        user =>
          user.email === email &&
          user.password === password
      )

    if (!matchedUser) {

      alert('Invalid Credentials')

      return
    }

    localStorage.setItem(
      'user',
      JSON.stringify(matchedUser)
    )

    setUser(matchedUser)
  }

  return (

    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-10">

        <div className="text-center mb-10">

          <h1 className="text-5xl font-bold text-slate-800 mb-3">
            Retail POS
          </h1>

          <p className="text-slate-500">
            Omnichannel Retail Management System
          </p>

        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-6"
        >

          <div>

            <label className="block text-sm font-semibold text-slate-600 mb-2">

              Email Address

            </label>

            <input
              type="email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              className="w-full border border-slate-300 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter email"
              required
            />

          </div>

          <div>

            <label className="block text-sm font-semibold text-slate-600 mb-2">

              Password

            </label>

            <input
              type="password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              className="w-full border border-slate-300 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-300"
              placeholder="Enter password"
              required
            />

          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white p-4 rounded-2xl font-bold shadow-lg"
          >

            Login To Dashboard

          </button>

        </form>

        <div className="mt-8 bg-slate-100 rounded-2xl p-5">

          <h3 className="font-bold text-slate-700 mb-3">
            Demo Accounts
          </h3>

          <div className="space-y-2 text-sm text-slate-600">

            <p>
              Admin:
              admin@pos.com
            </p>

            <p>
              Manager:
              manager@pos.com
            </p>

            <p>
              Cashier:
              cashier@pos.com
            </p>

          </div>

        </div>

      </div>

    </div>
  )
}
