export default function Login() {

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">

      <div className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md">

        <h1 className="text-3xl font-bold text-center text-slate-800 mb-2">
          Retail POS System
        </h1>

        <p className="text-center text-slate-500 mb-8">
          Login to continue
        </p>

        <form className="space-y-5">

          <input
            type="email"
            placeholder="Email Address"
            className="w-full border border-slate-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-slate-300 p-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white p-4 rounded-lg font-semibold"
          >
            Login
          </button>

        </form>

      </div>

    </div>
  )
}
