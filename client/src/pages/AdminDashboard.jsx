import {
  useEffect,
  useState
} from 'react'

import {
  ShieldCheck,
  Users,
  ShoppingCart,
  DollarSign,
  Boxes,
  LogOut
} from 'lucide-react'
import { saveAs }
  from 'file-saver'

import {
  downloadSalesReport
} from '../services/api'
import {
  fetchDashboardStats
} from '../services/api'

export default function AdminDashboard({
  setActivePage
}) {

  const [stats, setStats] =
    useState({
      totalProducts: 0,
      lowStockProducts: 0,
      totalOrders: 0,
      totalRevenue: 0
    })

  useEffect(() => {

    loadDashboardStats()

  }, [])

  const loadDashboardStats =
    async () => {

      const data =
        await fetchDashboardStats()

      setStats({
        totalProducts:
          data?.data?.totalProducts || 0,

        lowStockProducts:
          data?.data?.lowStockProducts || 0,

        totalOrders:
          data?.data?.totalOrders || 0,

        totalRevenue:
          data?.data?.totalRevenue || 0
      })
    }

  const handleLogout = () => {

    localStorage.removeItem(
      'user'
    )

    window.location.reload()
  }
  const handleExportReport =
  async () => {

    const data =
      await downloadSalesReport()

    const orders =
      data.data || []

    let csvContent =
      'Order ID,Date,Total Amount\n'

    orders.forEach(order => {

      csvContent +=
        `${order._id},${order.createdAt},${order.totalAmount}\n`
    })

    const blob =
      new Blob(
        [csvContent],
        {
          type: 'text/csv;charset=utf-8;'
        }
      )

    saveAs(
      blob,
      'sales-report.csv'
    )
}

  return (

    <div className="flex min-h-screen bg-slate-100">

      <div className="w-72 bg-slate-950 text-white p-8 flex flex-col justify-between">

        <div>

          <h1 className="text-4xl font-bold">
            Admin Panel
          </h1>

          <p className="text-slate-400 mt-2">
            Retail POS Management
          </p>

          <div className="mt-10 space-y-4">

            <button className="w-full bg-blue-600 p-4 rounded-2xl text-left font-semibold">

              Dashboard

            </button>

            <button
              onClick={() =>
                setActivePage(
                  'orders'
                )
              }
              className="w-full hover:bg-slate-800 p-4 rounded-2xl text-left transition"
            >

              Orders Management

            </button>

            <button
              onClick={() =>
                setActivePage(
                  'users'
                )
              }
              className="w-full hover:bg-slate-800 p-4 rounded-2xl text-left transition"
            >

              User Management

            </button>

          </div>

        </div>

        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 transition p-4 rounded-2xl font-semibold flex items-center justify-center gap-3"
        >

          <LogOut size={22} />

          Logout

        </button>

      </div>

      <div className="flex-1 p-10">

        <div className="flex justify-between items-center mb-10">

          <div>

            <h1 className="text-5xl font-bold text-slate-800">
              Administrator Dashboard
            </h1>

            <p className="text-slate-500 mt-3 text-lg">
              Complete system management and analytics
            </p>

          </div>

          <div className="bg-red-600 text-white px-6 py-3 rounded-2xl font-semibold shadow-lg">

            Admin Control Panel

          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white p-8 rounded-3xl shadow-xl">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-sm uppercase">
                  Products
                </p>

                <h2 className="text-5xl font-bold mt-4">
                  {stats.totalProducts}
                </h2>

              </div>

              <Boxes size={55} />

            </div>

          </div>

          <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-8 rounded-3xl shadow-xl">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-sm uppercase">
                  Orders
                </p>

                <h2 className="text-5xl font-bold mt-4">
                  {stats.totalOrders}
                </h2>

              </div>

              <ShoppingCart size={55} />

            </div>

          </div>

          <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white p-8 rounded-3xl shadow-xl">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-sm uppercase">
                  Revenue
                </p>

                <h2 className="text-5xl font-bold mt-4">
                  ₹{stats.totalRevenue}
                </h2>

              </div>

              <DollarSign size={55} />

            </div>

          </div>

          <div className="bg-gradient-to-r from-purple-600 to-pink-500 text-white p-8 rounded-3xl shadow-xl">

            <div className="flex justify-between items-center">

              <div>

                <p className="text-sm uppercase">
                  Security
                </p>

                <h2 className="text-4xl font-bold mt-4">
                  RBAC
                </h2>

              </div>

              <ShieldCheck size={55} />

            </div>

          </div>

        </div>
        <div className="mb-8">

  <button
    onClick={handleExportReport}
    className="bg-green-600 hover:bg-green-700 transition text-white px-6 py-4 rounded-2xl font-bold shadow-lg"
  >

    Export Sales Report

  </button>

</div>
        <div className="mt-10 bg-white rounded-3xl shadow-lg p-8">

          <h2 className="text-3xl font-bold text-slate-800 mb-6">

            System Overview

          </h2>

          <div className="grid md:grid-cols-2 gap-8">

            <div className="border border-slate-200 rounded-2xl p-6">

              <h3 className="text-xl font-bold text-slate-700 mb-4">

                Inventory Status

              </h3>

              <p className="text-slate-500 mb-3">
                Total Products:
                {' '}
                {stats.totalProducts}
              </p>

              <p className="text-red-500 font-semibold">
                Low Stock Alerts:
                {' '}
                {stats.lowStockProducts}
              </p>

            </div>

            <div className="border border-slate-200 rounded-2xl p-6">

              <h3 className="text-xl font-bold text-slate-700 mb-4">

                Sales Analytics

              </h3>

              <p className="text-slate-500 mb-3">
                Orders Processed:
                {' '}
                {stats.totalOrders}
              </p>

              <p className="text-green-600 font-semibold">
                Revenue Generated:
                {' '}
                ₹{stats.totalRevenue}
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}
