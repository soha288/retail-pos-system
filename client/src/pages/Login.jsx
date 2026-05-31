export default function Login({
  setIsLoggedIn
}) {

  const handleLogin = (e) => {

    e.preventDefault()

    setIsLoggedIn(true)
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

          <div>

            <label className="block text-slate-600 mb-2">
              Email Address
            </label>

            <input
              type="email"
              placeholder="admin@gmail.com"
              className="w-full border border-slate-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

          </div>

          <div>

            <label className="block text-slate-600 mb-2">
              Password
            </label>

            <input
              type="password"
              placeholder="••••••••"
              className="w-full border border-slate-300 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white p-4 rounded-xl font-semibold"
          >
            Login
          </button>

        </form>

        <p className="text-center text-slate-500 mt-6">

          RBAC Enabled • JWT Authentication

        </p>

      </div>

    </div>
  )
}
