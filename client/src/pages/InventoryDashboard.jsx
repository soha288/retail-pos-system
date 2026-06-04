import {
  useEffect,
  useState
} from 'react'

import Navbar from '../components/Navbar'

import Sidebar from '../components/Sidebar'

import ProductForm from '../components/ProductForm'

import ProductTable from '../components/ProductTable'

import {
  fetchProducts,
fetchDashboardStats
} from '../services/api'

import {
  Boxes,
  AlertTriangle,
  ShoppingCart,
  Users
} from 'lucide-react'

export default function Dashboard({
  user,
  setActivePage
}) {

  const [products, setProducts] =
    useState([])
const [search, setSearch] =
  useState('')
const [stats, setStats] =
  useState({
    totalProducts: 0,
    lowStockProducts: 0,
    totalOrders: 0,
    totalRevenue: 0
  })
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
  const loadProducts = async () => {

    const data =
      await fetchProducts(search)

    setProducts(data.data || [])
  }

  useEffect(() => {

  loadProducts()

  loadDashboardStats()

}, [search])

  const lowStockProducts =
  products.filter(
    product =>
      product.stock <= 5
  )

  return (

    <div className="bg-slate-100 min-h-screen">

      <Navbar
        search={search}
        setSearch={setSearch}
      />

      <div className="flex">

        <Sidebar
  setActivePage={setActivePage}
/>

        <div className="flex-1 p-8">

          <div className="flex justify-between items-center mb-8">

            <div>

              <h1 className="text-4xl font-bold text-slate-800 mb-2">
                Inventory Management Dashboard
              </h1>

              <p className="text-slate-500">
                Welcome back! Here's what's happening in your store today.
              </p>

            </div>

            <p className="text-slate-500 font-semibold text-lg">
              {user?.role}
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

            <div className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-2xl p-6 shadow-lg text-white">

              <div className="flex items-center justify-between mb-5">

                <div>

                  <h3 className="text-sm uppercase tracking-wide opacity-80">
                    Total Products
                  </h3>

                  <p className="text-4xl font-bold mt-3">
                    {stats.totalProducts}
                  </p>

                </div>

                <div className="bg-white/20 p-4 rounded-2xl">

                  <Boxes size={32} />

                </div>

              </div>

              <p className="text-sm opacity-80">
                Available Inventory
              </p>

            </div>

            <div className="bg-gradient-to-r from-red-500 to-orange-400 rounded-2xl p-6 shadow-lg text-white">

              <div className="flex items-center justify-between mb-5">

                <div>

                  <h3 className="text-sm uppercase tracking-wide opacity-80">
                    Low Stock Alerts
                  </h3>

                  <p className="text-4xl font-bold mt-3">
                    {stats.lowStockProducts}
                  </p>

                </div>

                <div className="bg-white/20 p-4 rounded-2xl">

                  <AlertTriangle size={32} />

                </div>

              </div>

              <p className="text-sm opacity-80">
                Requires Attention
              </p>

            </div>

            <div className="bg-gradient-to-r from-green-500 to-emerald-400 rounded-2xl p-6 shadow-lg text-white">

              <div className="flex items-center justify-between mb-5">

                <div>

                  <h3 className="text-sm uppercase tracking-wide opacity-80">
                    Active Orders
                  </h3>

                  <p className="text-4xl font-bold mt-3">
                    {stats.totalOrders}
                  </p>

                </div>

                <div className="bg-white/20 p-4 rounded-2xl">

                  <ShoppingCart size={32} />

                </div>

              </div>

              <p className="text-sm opacity-80">
                Orders Today
              </p>

            </div>

            <div className="bg-gradient-to-r from-purple-600 to-pink-500 rounded-2xl p-6 shadow-lg text-white">

              <div className="flex items-center justify-between mb-5">

                <div>

                  <h3 className="text-sm uppercase tracking-wide opacity-80">
                    Total Revenue
                  </h3>

                  <p className="text-4xl font-bold mt-3">
                    ₹{stats.totalRevenue}
                  </p>

                </div>

                <div className="bg-white/20 p-4 rounded-2xl">

                  <Users size={32} />

                </div>

              </div>

              <p className="text-sm opacity-80">
                Revenue Generated
              </p>

            </div>

          </div>

          <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">

            <div className="xl:col-span-3">

              <ProductForm
                refreshProducts={() => {

  loadProducts()

  loadDashboardStats()
}}
              />

              <ProductTable
                products={products}
                refreshProducts={() => {

  loadProducts()

  loadDashboardStats()
}}
              />

            </div>

            <div className="space-y-6">

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">

                <h2 className="text-2xl font-bold text-slate-700 mb-6">
                  Quick Actions
                </h2>

                <div className="space-y-4">

                  <button className="w-full bg-blue-600 hover:bg-blue-700 transition text-white p-4 rounded-xl font-semibold shadow-md">
                    Add New Product
                  </button>

                  <button className="w-full bg-green-600 hover:bg-green-700 transition text-white p-4 rounded-xl font-semibold shadow-md">
                    Stock Entry
                  </button>

                  <button className="w-full bg-purple-600 hover:bg-purple-700 transition text-white p-4 rounded-xl font-semibold shadow-md">
                    Add Category
                  </button>

                  <button className="w-full bg-orange-500 hover:bg-orange-600 transition text-white p-4 rounded-xl font-semibold shadow-md">
                    Sales Report
                  </button>

                </div>

              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">

                <h2 className="text-2xl font-bold text-red-500 mb-6">
                  Low Stock Alerts
                </h2>

                {

                  lowStockProducts.length === 0

                    ?

                    <p className="text-slate-500">
                      No low stock alerts.
                    </p>

                    :

                    lowStockProducts.map(
                      product => (

                        <div
                          key={product._id}
                          className="border-b py-4"
                        >

                          <h3 className="font-semibold text-slate-700 text-lg">
                            {product.name}
                          </h3>

                          <p className="text-sm text-slate-500">
                            {product.category}
                          </p>

                          <div className="mt-2 inline-block bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">

                            {product.stock} items left

                          </div>

                        </div>

                      )
                    )

                }

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  )
}
