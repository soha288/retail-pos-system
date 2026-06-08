import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  LogOut
} from 'lucide-react'

export default function Sidebar({
  setActivePage
}) {

  const handleLogout = () => {

    localStorage.removeItem(
      'user'
    )

    window.location.reload()
  }

  return (

    <div className="w-72 bg-slate-950 text-white min-h-screen flex flex-col justify-between">

      <div>

        <div className="p-8 border-b border-slate-800">

          <h1 className="text-5xl font-bold leading-tight">

            POS &
            <br />
            Inventory

          </h1>

          <p className="text-slate-400 mt-4">

            Management System

          </p>

        </div>

        <div className="p-5 space-y-4">

          <button
            onClick={() =>
              setActivePage(
                'inventory'
              )
            }
            className="w-full bg-blue-600 hover:bg-blue-700 transition p-5 rounded-2xl flex items-center gap-4 text-lg font-semibold"
          >

            <LayoutDashboard size={24} />

            Dashboard

          </button>

          

          <button
            onClick={() =>
              setActivePage(
                'orders'
              )
            }
            className="w-full hover:bg-slate-800 transition p-5 rounded-2xl flex items-center gap-4 text-lg"
          >

            <ShoppingCart size={24} />

            POS Orders

          </button>

        </div>

      </div>

      <div className="p-5">

        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 transition p-5 rounded-2xl font-semibold flex items-center justify-center gap-3 text-lg"
        >

          <LogOut size={24} />

          Logout

        </button>

      </div>

    </div>
  )
}
