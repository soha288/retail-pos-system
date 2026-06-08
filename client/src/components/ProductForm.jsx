import { useState }
from 'react'

import toast
from 'react-hot-toast'

import {
  createProduct
} from '../services/api'

export default function ProductForm({
  refreshProducts
}) {

  const [formData, setFormData] =
    useState({
      name: '',
      sku: '',
      category: '',
      price: '',
      stock: ''
    })

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value
    })
  }

  const handleSubmit =
    async (e) => {

      e.preventDefault()

      await createProduct({
        ...formData,
        price: Number(
          formData.price
        ),
        stock: Number(
          formData.stock
        )
      })

      toast.success(
        'Product Added Successfully'
      )

      refreshProducts()

      setFormData({
        name: '',
        sku: '',
        category: '',
        price: '',
        stock: ''
      })
    }

  return (

    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8 mb-8">

      <div className="flex items-center justify-between mb-8">

        <div>

          <h2 className="text-3xl font-bold text-slate-800">
            Add New Product
          </h2>

          <p className="text-slate-500 mt-1">
            Create and manage inventory products
          </p>

        </div>

        <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl font-semibold">
          Inventory Module
        </div>

      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
      >

        <div>

          <label className="block text-sm font-semibold text-slate-600 mb-2">

            Product Name

          </label>

          <input
            type="text"
            name="name"
            placeholder="Enter product name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-4 rounded-xl"
            required
          />

        </div>

        <div>

          <label className="block text-sm font-semibold text-slate-600 mb-2">

            SKU

          </label>

          <input
            type="text"
            name="sku"
            placeholder="Enter SKU"
            value={formData.sku}
            onChange={handleChange}
            className="w-full border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-4 rounded-xl"
            required
          />

        </div>

        <div>

          <label className="block text-sm font-semibold text-slate-600 mb-2">

            Category

          </label>

          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-4 rounded-xl"
            required
          >

            <option value="">
              Select Category
            </option>

            <option>Electronics</option>
            <option>Grocery</option>
            <option>Fashion</option>
            <option>Footwear</option>
            <option>Cosmetics</option>
            <option>Accessories</option>
            <option>Furniture</option>

          </select>

        </div>

        <div>

          <label className="block text-sm font-semibold text-slate-600 mb-2">

            Product Price

          </label>

          <input
            type="number"
            name="price"
            placeholder="Enter price"
            value={formData.price}
            onChange={handleChange}
            className="w-full border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-4 rounded-xl"
            required
          />

        </div>

        <div>

          <label className="block text-sm font-semibold text-slate-600 mb-2">

            Stock Quantity

          </label>

          <input
            type="number"
            name="stock"
            placeholder="Enter stock quantity"
            value={formData.stock}
            onChange={handleChange}
            className="w-full border border-slate-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none p-4 rounded-xl"
            required
          />

        </div>

        <div className="flex items-end">

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 transition text-white font-semibold p-4 rounded-xl shadow-md"
          >

            Create Product

          </button>

        </div>

      </form>

    </div>
  )
}
