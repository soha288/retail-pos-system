export default function Sidebar() {

  return (
    <div className="w-72 bg-slate-900 text-white min-h-screen p-6">

      <h2 className="text-3xl font-bold mb-10">
        POS Dashboard
      </h2>

      <div className="space-y-4">

        <button className="w-full text-left bg-blue-600 px-4 py-3 rounded-lg">
          Inventory Management
        </button>

        <button className="w-full text-left hover:bg-slate-800 px-4 py-3 rounded-lg transition">
          POS Orders
        </button>

        <button className="w-full text-left hover:bg-slate-800 px-4 py-3 rounded-lg transition">
          Cashier Management
        </button>

        <button className="w-full text-left hover:bg-slate-800 px-4 py-3 rounded-lg transition">
          Reports & Analytics
        </button>

        <button className="w-full text-left hover:bg-slate-800 px-4 py-3 rounded-lg transition">
          User Roles & RBAC
        </button>

        <button className="w-full text-left hover:bg-slate-800 px-4 py-3 rounded-lg transition">
          System Settings
        </button>

      </div>

    </div>
  )
}
