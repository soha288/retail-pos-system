import {
  useEffect,
  useState
} from 'react'

import Navbar from '../components/Navbar'

import Sidebar from '../components/Sidebar'

import ProductForm from '../components/ProductForm'

import ProductTable from '../components/ProductTable'

import SearchBar from '../components/SearchBar'

import {
  fetchProducts
} from '../services/api'

export default function Dashboard() {

  const [products, setProducts] =
    useState([])

  const [search, setSearch] =
    useState('')

  const loadProducts = async () => {

    const data =
      await fetchProducts(search)

    setProducts(data.data || [])
  }

  useEffect(() => {

    loadProducts()

  }, [search])

  const lowStockProducts =
    products.filter(
      product => product.lowStock
    )

  return (

    <div className="bg-slate-100 min-h-screen">

      <Navbar />

      <div className="flex">

        <Sidebar />

        <div className="flex-1 p-8">

          <div className="flex justify-between items-center mb-8">

            <div>

              <h1 className="text-4xl font-bold text-slate-800 mb-2">
                Dashboard
              </h1>

              <p className="text-slate-500">
                Welcome back! Here's what's happening in your store today.
              </p>

            </div>

            <p className="text-slate-500">
              Admin Dashboard
            </p>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">

              <h3 className="text-slate-500 mb-3">
                TOTAL PRODUCTS
              </h3>

              <p className="text-4xl font-bold text-blue-600">
                {products.length}
              </p>

              <p className="text-slate-400 mt-2">
                Available Inventory
              </p>

            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">

              <h3 className="text-slate-500 mb-3">
                LOW STOCK ALERTS
              </h3>

              <p className="text-4xl font-bold text-red-500">
                {lowStockProducts.length}
              </p>

              <p className="text-slate-400 mt-2">
                Requires Attention
              </p>

            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">

              <h3 className="text-slate-500 mb-3">
                ACTIVE ORDERS
              </h3>

              <p className="text-4xl font-bold text-green-600">
                24
              </p>

              <p className="text-slate-400 mt-2">
                Orders Today
              </p>

            </div>

            <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">

              <h3 className="text-slate-500 mb-3">
                ACTIVE CASHIERS
              </h3>

              <p className="text-4xl font-bold text-purple-600">
                6
              </p>

              <p className="text-slate-400 mt-2">
                System Users
              </p>

            </div>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">

            <div className="lg:col-span-3">

              <ProductForm
                refreshProducts={loadProducts}
              />

              <SearchBar
                search={search}
                setSearch={setSearch}
              />

              <ProductTable
                products={products}
                refreshProducts={loadProducts}
              />

            </div>

            <div className="space-y-6">

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">

                <h2 className="text-xl font-bold text-slate-700 mb-5">
                  Quick Actions
                </h2>

                <div className="space-y-4">

                  <button className="w-full bg-blue-600 hover:bg-blue-700 transition text-white p-4 rounded-xl font-semibold">
                    Add New Product
                  </button>

                  <button className="w-full bg-green-600 hover:bg-green-700 transition text-white p-4 rounded-xl font-semibold">
                    Stock Entry
                  </button>

                  <button className="w-full bg-purple-600 hover:bg-purple-700 transition text-white p-4 rounded-xl font-semibold">
                    Add Category
                  </button>

                  <button className="w-full bg-orange-500 hover:bg-orange-600 transition text-white p-4 rounded-xl font-semibold">
                    Sales Report
                  </button>

                </div>

              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">

                <h2 className="text-xl font-bold text-red-500 mb-5">
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
                          className="border-b py-3"
                        >

                          <h3 className="font-semibold text-slate-700">
                            {product.name}
                          </h3>

                          <p className="text-sm text-slate-500">
                            {product.category}
                          </p>

                          <p className="text-red-500 text-sm font-semibold mt-1">
                            {product.stock} items left
                          </p>

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
