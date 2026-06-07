import {
  Bell,
  Menu
} from 'lucide-react'

import SearchBar from './SearchBar'

export default function Navbar({
  search,
  setSearch
}) {

  return (

    <div className="bg-white border-b border-slate-200 px-8 py-5 flex justify-between items-center shadow-sm">

      <div className="flex items-center gap-6">

        <button className="bg-slate-100 hover:bg-slate-200 transition p-3 rounded-xl">

          <Menu
            size={22}
            className="text-slate-700"
          />

        </button>

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

      </div>

      <div className="flex items-center gap-6">

        <div className="relative">

          <button className="bg-slate-100 hover:bg-slate-200 transition p-3 rounded-xl">

            <Bell
              size={22}
              className="text-slate-700"
            />

          </button>

          

        </div>

        <div className="text-right">

          <p className="font-bold text-slate-800">
            Inventory Manager
          </p>

          <p className="text-sm text-slate-500">
            RBAC Enabled
          </p>

        </div>

        <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold shadow-lg">

          I

        </div>

      </div>

    </div>
  )
}
