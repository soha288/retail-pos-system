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

  return (
    <div className="bg-slate-100 min-h-screen">

      <Navbar />

      <div className="flex">

        <Sidebar />

        <div className="flex-1 p-8">

          <div className="mb-8">

            <h1 className="text-4xl font-bold text-slate-800 mb-2">
              Inventory Dashboard
            </h1>

            <p className="text-slate-500">
              Product & Inventory Management Module
            </p>

          </div>

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

      </div>

    </div>
  )
}
