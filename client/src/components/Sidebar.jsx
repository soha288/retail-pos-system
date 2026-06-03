import {
  LayoutDashboard,
  Boxes,
  ShoppingCart,
  Users,
  FileBarChart2,
  Settings,
  LogOut,
  ShieldCheck
} from 'lucide-react'

export default function Sidebar({
  setActivePage
}) {

  return (

    <div className="w-72 bg-gradient-to-b from-slate-950 to-slate-900 text-white min-h-screen flex flex-col shadow-2xl">

      <div className="p-8 border-b border-slate-800">

        <h1 className="text-3xl font-bold tracking-wide">
          POS & Inventory
        </h1>

        <p className="text-slate-400 mt-2 text-sm">
          Management System
        </p>

      </div>

      <div className="flex-1 p-5 space-y-3">

        <button className="w-full flex items-center gap-4 bg-blue-600 hover:bg-blue-700 transition p-4 rounded-2xl shadow-lg">

          <LayoutDashboard size={22} />

          <span className="font-semibold">
            Dashboard
          </span>

        </button>

        <button className="w-full flex items-center gap-4 hover:bg-slate-800 transition p-4 rounded-2xl">

          <Boxes size={22} />

          <span>
            Inventory Management
          </span>

        </button>

        <button
  onClick={() =>
    setActivePage('orders')
  }
  className="w-full flex items-center gap-4 hover:bg-slate-800 transition p-4 rounded-2xl"
>

  <ShoppingCart size={22} />

  <span>
    POS Orders
  </span>

</button>

        <button className="w-full flex items-center gap-4 hover:bg-slate-800 transition p-4 rounded-2xl">

          <Users size={22} />

          <span>
            Cashier Management
          </span>

        </button>

        <button className="w-full flex items-center gap-4 hover:bg-slate-800 transition p-4 rounded-2xl">

          <FileBarChart2 size={22} />

          <span>
            Reports & Analytics
          </span>

        </button>

        <button className="w-full flex items-center gap-4 hover:bg-slate-800 transition p-4 rounded-2xl">

          <ShieldCheck size={22} />

          <span>
            User Roles & RBAC
          </span>

        </button>

      </div>

      <div className="p-5 border-t border-slate-800 space-y-3">

        <button className="w-full flex items-center gap-4 hover:bg-slate-800 transition p-4 rounded-2xl">

          <Settings size={22} />

          <span>
            System Settings
          </span>

        </button>

        <button
  onClick={() => {

    localStorage.removeItem(
      'user'
    )

    window.location.reload()
  }}
  className="w-full flex items-center gap-4 bg-red-600 hover:bg-red-700 transition p-4 rounded-2xl shadow-lg"
>

  <LogOut size={22} />

  <span className="font-semibold">
    Logout
  </span>

</button>

      </div>

    </div>
  )
}
