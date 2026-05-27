import {
  useEffect,
  useState
} from 'react'

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
    <div className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-8 text-center">
          Retail POS System
        </h1>

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
  )
}
