import { useState } from 'react'

export default function Login({
  setUser
}) {

  const [role, setRole] =
    useState('Inventory Manager')

  const handleLogin = (e) => {

    e.preventDefault()

    setUser({
      role
    })
  }

  return (

    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-6">

      <div className="bg-white w-full max-w-md rounded-3xl shadow-2xl p-10 border border-slate-200">

        <div className="text-center mb-8">

          <h1 className="text-4xl font-bold text-slate-800 mb-3">
            Retail POS
          </h1>

          <p className="text-slate-500">
            Omnichannel Retail Management System
          </p>

        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-5"
        >

          <input
            type="email"
            placeholder="Enter Email"
            className="w-full border border-slate-300 p-4 rounded-xl"
            required
          />

          <input
            type="password"
            placeholder="Enter Password"
            className="w-full border border-slate-300 p-4 rounded-xl"
            required
          />

          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
            className="w-full border border-slate-300 p-4 rounded-xl"
          >

            <option>
              Inventory Manager
            </option>

            <option>
              System Administrator
            </option>

            <option>
              Store Cashier
            </option>

          </select>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white p-4 rounded-xl font-semibold"
          >
            Login
          </button>

        </form>

        <p className="text-center text-slate-500 mt-6">

          JWT Authentication • RBAC Enabled

        </p>

      </div>

    </div>
  )
}
