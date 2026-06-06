import {
  useEffect,
  useState
} from 'react'

import {
  ShieldCheck,
  ShoppingCart,
  DollarSign,
  Boxes,
  LogOut,
  Package,
  Users,
  FileBarChart2
} from 'lucide-react'

import { saveAs }
  from 'file-saver'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts'

import {
  downloadSalesReport,
  fetchOrders,
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

  const [orders, setOrders] =
    useState([])

  useEffect(() => {

    loadDashboardStats()

    loadOrders()

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

  const loadOrders =
    async () => {

      const data =
        await fetchOrders()

      setOrders(
        data.data || []
      )
    }

  const handleLogout = () => {

  localStorage.removeItem(
    'user'
  )

  localStorage.removeItem(
    'token'
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
            type:
              'text/csv;charset=utf-8;'
          }
        )

      saveAs(
        blob,
        'sales-report.csv'
      )
    }

  const operationalData = [

    {
      name: 'Products',
      value: stats.totalProducts,
      color: '#2563eb'
    },

    {
      name: 'Orders',
      value: stats.totalOrders,
      color: '#22c55e'
    },

    {
      name: 'Low Stock',
      value: stats.lowStockProducts,
      color: '#ef4444'
    }

  ]

  const revenueData = [

    {
      name: 'Revenue',
      value: stats.totalRevenue,
      color: '#f97316'
    }

  ]

  const pieData = [

    {
      name: 'Products',
      value: stats.totalProducts,
      color: '#2563eb'
    },

    {
      name: 'Orders',
      value: stats.totalOrders,
      color: '#22c55e'
    },

    {
      name: 'Low Stock',
      value: stats.lowStockProducts,
      color: '#ef4444'
    }

  ]

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
                  'inventory'
                )
              }
              className="w-full hover:bg-slate-800 p-4 rounded-2xl text-left transition flex items-center gap-3"
            >

              <Package size={22} />

              Inventory

            </button>

            <button
              onClick={() =>
                setActivePage(
                  'orders'
                )
              }
              className="w-full hover:bg-slate-800 p-4 rounded-2xl text-left transition flex items-center gap-3"
            >

              <ShoppingCart size={22} />

              POS Orders

            </button>

            <button
              onClick={() =>
                setActivePage(
                  'users'
                )
              }
              className="w-full hover:bg-slate-800 p-4 rounded-2xl text-left transition flex items-center gap-3"
            >

              <Users size={22} />

              Users

            </button>

            <button
              onClick={
                handleExportReport
              }
              className="w-full hover:bg-slate-800 p-4 rounded-2xl text-left transition flex items-center gap-3"
            >

              <FileBarChart2 size={22} />

              Reports

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

        <div className="mt-10 bg-white rounded-3xl shadow-lg p-8 min-w-0">

          <div className="mb-8">

            <h2 className="text-3xl font-bold text-slate-800">

              Business Distribution

            </h2>

          </div>

          <div className="h-96 w-full">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <Pie
                  data={pieData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={140}
                  label
                >

                  {

                    pieData.map(
                      (
                        entry,
                        index
                      ) => (

                        <Cell
                          key={index}
                          fill={entry.color}
                        />

                      )
                    )

                  }

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>

        </div>

        <div className="mt-10 grid grid-cols-1 xl:grid-cols-2 gap-8">

          <div className="bg-white rounded-3xl shadow-lg p-8 min-w-0">

            <h2 className="text-3xl font-bold text-slate-800 mb-8">

              Operational Analytics

            </h2>

            <div className="h-80 w-full">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <BarChart
                  data={operationalData}
                >

                  <XAxis dataKey="name" />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="value"
                    radius={[10, 10, 0, 0]}
                  >

                    {

                      operationalData.map(
                        (
                          entry,
                          index
                        ) => (

                          <Cell
                            key={index}
                            fill={entry.color}
                          />

                        )
                      )

                    }

                  </Bar>

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

          <div className="bg-white rounded-3xl shadow-lg p-8 min-w-0">

            <h2 className="text-3xl font-bold text-slate-800 mb-8">

              Revenue Analytics

            </h2>

            <div className="h-80 w-full">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <BarChart
                  data={revenueData}
                >

                  <XAxis dataKey="name" />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="value"
                    radius={[10, 10, 0, 0]}
                  >

                    {

                      revenueData.map(
                        (
                          entry,
                          index
                        ) => (

                          <Cell
                            key={index}
                            fill={entry.color}
                          />

                        )
                      )

                    }

                  </Bar>

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

        </div>

        <div className="mt-10 bg-white rounded-3xl shadow-lg p-8">

          <div className="flex justify-between items-center mb-8">

            <div>

              <h2 className="text-3xl font-bold text-slate-800">

                Recent Orders

              </h2>

              <p className="text-slate-500 mt-2">

                Latest transactions across POS system

              </p>

            </div>

            <div className="bg-blue-100 text-blue-700 px-5 py-2 rounded-2xl font-semibold">

              {orders.length} Orders

            </div>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b border-slate-200 text-slate-600">

                  <th className="text-left py-4">
                    Order ID
                  </th>

                  <th className="text-left py-4">
                    Products
                  </th>

                  <th className="text-left py-4">
                    Revenue
                  </th>

                  <th className="text-left py-4">
                    Date
                  </th>

                </tr>

              </thead>

              <tbody>

                {

                  orders
                    .slice(0, 5)
                    .map(order => (

                      <tr
                        key={order._id}
                        className="border-b border-slate-100 hover:bg-slate-50 transition"
                      >

                        <td className="py-5 font-semibold text-slate-700">

                          #{order._id.slice(-6)}

                        </td>

                        <td className="py-5 text-slate-600">

                          {
                            order.products.length
                          } Items

                        </td>

                        <td className="py-5 font-bold text-green-600">

                          ₹{order.totalAmount}

                        </td>

                        <td className="py-5 text-slate-500">

                          {
                            new Date(
                              order.createdAt
                            ).toLocaleDateString()
                          }

                        </td>

                      </tr>
                    ))

                }

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>
  )
}
