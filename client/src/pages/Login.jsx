import { useState } from 'react'

import {
  loginUser
} from '../services/api'

export default function Login({
  setUser
}) {

  const [email, setEmail] =
    useState('manager@pos.com')

  const [password, setPassword] =
    useState('manager123')

  const handleLogin =
    async (e) => {

      e.preventDefault()

      const data =
        await loginUser({
          email,
          password
        })

      if (!data.success) {

        alert(
          data.message ||
          'Invalid Credentials'
        )

        return
      }

      localStorage.setItem(
  'token',
  data.token
)

localStorage.setItem(
  'user',
  JSON.stringify(
    data.user
  )
)

      setUser(data.user)
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
                setEmail(
                  e.target.value
                )
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
                setPassword(
                  e.target.value
                )
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
            Database Connected
          </h3>

          <div className="space-y-2 text-sm text-slate-600">

            <p>
              Login using users stored in MongoDB Atlas
            </p>

          </div>

        </div>

      </div>

    </div>
  )
}
