import { useState } from 'react'

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
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {

    e.preventDefault()

    const data = await createProduct({
      ...formData,
      price: Number(formData.price),
      stock: Number(formData.stock)
    })

    alert(data.message)

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
    <div className="bg-white p-6 rounded-xl shadow-md mb-8">

      <h2 className="text-2xl font-semibold mb-4">
        Add Product
      </h2>

      <form
        onSubmit={handleSubmit}
        className="grid md:grid-cols-2 gap-4"
      >

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="text"
          name="sku"
          placeholder="SKU"
          value={formData.sku}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={formData.stock}
          onChange={handleChange}
          className="border p-3 rounded-lg"
          required
        />

        <button
          type="submit"
          className="bg-black text-white p-3 rounded-lg"
        >
          Create Product
        </button>

      </form>

    </div>
  )
}
