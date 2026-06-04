import Orders from './Orders'

import {
  LogOut,
  ArrowLeft
} from 'lucide-react'

export default function CashierDashboard({
  user,
  setActivePage
}) {

  const handleLogout = () => {

    localStorage.removeItem(
      'user'
    )

    window.location.reload()
  }

  return (

    <div className="bg-slate-100 min-h-screen">

      <div className="p-8">

        <div className="flex justify-between items-center mb-6">

          <div>

            {

              user?.role ===
                'System Administrator'

                &&

                <button
                  onClick={() =>
                    setActivePage(
                      'dashboard'
                    )
                  }
                  className="flex items-center gap-3 bg-slate-200 hover:bg-slate-300 transition px-5 py-3 rounded-2xl font-semibold"
                >

                  <ArrowLeft size={22} />

                  Back To Admin Dashboard

                </button>

            }

          </div>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 transition text-white px-5 py-3 rounded-2xl font-semibold flex items-center gap-2"
          >

            <LogOut size={20} />

            Logout

          </button>

        </div>

        <Orders
          setActivePage={
            setActivePage
          }
        />

      </div>

    </div>
  )
}
