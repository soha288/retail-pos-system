import {
  deleteProduct,
  updateStock
} from '../services/api'

export default function ProductTable({
  products,
  refreshProducts
}) {

  const handleDelete = async (id) => {

    const confirmDelete =
      window.confirm(
        'Delete this product?'
      )

    if (!confirmDelete) return

    const data =
      await deleteProduct(id)

    alert(data.message)

    refreshProducts()
  }

  const handleStockUpdate =
    async (id, quantity) => {

      const data =
        await updateStock(
          id,
          quantity
        )

      alert(data.message)

      refreshProducts()
    }

  const handleEdit = async (
    product
  ) => {

    const updatedName =
      prompt(
        'Enter new product name',
        product.name
      )

    const updatedPrice =
      prompt(
        'Enter new product price',
        product.price
      )

    if (
      !updatedName ||
      !updatedPrice
    ) return

    const response =
      await fetch(
        `http://localhost:5000/products/${product._id}`,
        {
          method: 'PUT',

          headers: {
            'Content-Type': 'application/json'
          },

          body: JSON.stringify({
            name: updatedName,
            price: Number(updatedPrice),
            category: product.category,
            stock: product.stock,
            sku: product.sku
          })
        }
      )

    const data =
      await response.json()

    alert(data.message)

    refreshProducts()
  }

  return (

    <div className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden">

      <div className="flex items-center justify-between px-6 py-5 border-b border-slate-200">

        <div>

          <h2 className="text-2xl font-bold text-slate-800">
            Inventory List
          </h2>

          <p className="text-slate-500 text-sm mt-1">
            Manage all products and stock entries
          </p>

        </div>

        <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-xl font-semibold">
          {products.length} Products
        </div>

      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-slate-100 text-slate-700">

            <tr>

              <th className="p-4 text-left">
                #
              </th>

              <th className="p-4 text-left">
                Product
              </th>

              <th className="p-4 text-left">
                SKU
              </th>

              <th className="p-4 text-left">
                Category
              </th>

              <th className="p-4 text-left">
                Price
              </th>

              <th className="p-4 text-left">
                Stock
              </th>

              <th className="p-4 text-left">
                Status
              </th>

              <th className="p-4 text-left">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>

            {

              products.length === 0

                ?

                <tr>

                  <td
                    colSpan="8"
                    className="text-center py-10 text-slate-500"
                  >

                    No products found

                  </td>

                </tr>

                :

                products.map(
                  (
                    product,
                    index
                  ) => (

                    <tr
                      key={product._id}
                      className="border-b hover:bg-slate-50 transition"
                    >

                      <td className="p-4 font-semibold text-slate-500">
                        {index + 1}
                      </td>

                      <td className="p-4 font-semibold text-slate-800">
                        {product.name}
                      </td>

                      <td className="p-4 text-slate-600">
                        {product.sku}
                      </td>

                      <td className="p-4 text-slate-600">
                        {product.category}
                      </td>

                      <td className="p-4 font-semibold text-green-600">
                        ₹{product.price}
                      </td>

                      <td className="p-4">

                        <div className="flex items-center gap-3">

                          <button
                            onClick={() =>
                              handleStockUpdate(
                                product._id,
                                -1
                              )
                            }
                            className="bg-red-500 hover:bg-red-600 transition text-white w-8 h-8 rounded-lg"
                          >
                            -
                          </button>

                          <span className="font-semibold text-slate-700">
                            {product.stock}
                          </span>

                          <button
                            onClick={() =>
                              handleStockUpdate(
                                product._id,
                                1
                              )
                            }
                            className="bg-green-600 hover:bg-green-700 transition text-white w-8 h-8 rounded-lg"
                          >
                            +
                          </button>

                        </div>

                      </td>

                      <td className="p-4">

                        {

                          product.lowStock

                            ?

                            <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
                              Low Stock
                            </span>

                            :

                            <span className="bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold">
                              In Stock
                            </span>

                        }

                      </td>

                      <td className="p-4">

                        <div className="flex gap-2">

                          <button
                            onClick={() =>
                              handleEdit(product)
                            }
                            className="bg-blue-600 hover:bg-blue-700 transition text-white px-4 py-2 rounded-lg text-sm"
                          >
                            Update
                          </button>

                          <button
                            onClick={() =>
                              handleDelete(
                                product._id
                              )
                            }
                            className="bg-red-600 hover:bg-red-700 transition text-white px-4 py-2 rounded-lg text-sm"
                          >
                            Delete
                          </button>

                        </div>

                      </td>

                    </tr>

                  )
                )

            }

          </tbody>

        </table>

      </div>

      <div className="flex items-center justify-between px-6 py-4 bg-slate-50">

        <p className="text-sm text-slate-500">
          Showing {products.length} inventory items
        </p>

        <div className="flex gap-2">

          <button className="px-4 py-2 bg-slate-200 rounded-lg">
            Previous
          </button>

          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg">
            1
          </button>

          <button className="px-4 py-2 bg-slate-200 rounded-lg">
            Next
          </button>

        </div>

      </div>

    </div>
  )
}
