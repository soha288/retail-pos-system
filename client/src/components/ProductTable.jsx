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
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200 overflow-x-auto">

      <h2 className="text-xl font-bold text-slate-700 mb-4">
        Inventory Products
      </h2>

      <table className="w-full border-collapse">

        <thead>

          <tr className="bg-slate-200">

            <th className="p-3 text-left">
              Name
            </th>

            <th className="p-3 text-left">
              SKU
            </th>

            <th className="p-3 text-left">
              Category
            </th>

            <th className="p-3 text-left">
              Price
            </th>

            <th className="p-3 text-left">
              Stock
            </th>

            <th className="p-3 text-left">
              Status
            </th>

            <th className="p-3 text-left">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {products.map((product) => (

            <tr
              key={product._id}
              className="border-b"
            >

              <td className="p-3">
                {product.name}
              </td>

              <td className="p-3">
                {product.sku}
              </td>

              <td className="p-3">
                {product.category}
              </td>

              <td className="p-3">
                ₹{product.price}
              </td>

              <td className="p-3">

                <div className="flex items-center gap-2">

                  <button
                    onClick={() =>
                      handleStockUpdate(
                        product._id,
                        -1
                      )
                    }
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    -
                  </button>

                  <span>
                    {product.stock}
                  </span>

                  <button
                    onClick={() =>
                      handleStockUpdate(
                        product._id,
                        1
                      )
                    }
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    +
                  </button>

                </div>

              </td>

              <td
                className={`p-3 font-semibold ${
                  product.lowStock
                    ? 'text-red-600'
                    : 'text-green-600'
                }`}
              >

                {product.lowStock
                  ? 'Low Stock'
                  : 'In Stock'}

              </td>

              <td className="p-3 flex gap-2">

                <button
                  onClick={() =>
                    handleEdit(product)
                  }
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Edit
                </button>

                <button
                  onClick={() =>
                    handleDelete(
                      product._id
                    )
                  }
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  )
}
