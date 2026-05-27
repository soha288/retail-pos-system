export default function Sidebar() {

  return (
    <div className="w-64 bg-slate-900 text-white min-h-screen p-6">

      <h2 className="text-2xl font-bold mb-10">
        POS Dashboard
      </h2>

      <div className="space-y-4">

        <button className="w-full text-left bg-blue-600 px-4 py-3 rounded-lg">
          Inventory
        </button>

        <button className="w-full text-left hover:bg-slate-800 px-4 py-3 rounded-lg transition">
          Orders
        </button>

        <button className="w-full text-left hover:bg-slate-800 px-4 py-3 rounded-lg transition">
          Users
        </button>

        <button className="w-full text-left hover:bg-slate-800 px-4 py-3 rounded-lg transition">
          Reports
        </button>

        <button className="w-full text-left hover:bg-slate-800 px-4 py-3 rounded-lg transition">
          Settings
        </button>

      </div>

    </div>
  )
}
