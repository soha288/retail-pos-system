import {
  useEffect,
  useState
} from 'react'

import {
  fetchProducts,
createOrder,
fetchOrders
} from '../services/api'

export default function Orders({setActivePage}) {

  const [products, setProducts] =
    useState([])

  const [cart, setCart] =
    useState([])

  const [discount, setDiscount] =
    useState(0)

  const [search, setSearch] =
    useState('')

  const [orderHistory, setOrderHistory] =
    useState([])

 useEffect(() => {

  loadProducts()

  loadOrders()

}, [])

  const loadProducts = async () => {

    const data =
      await fetchProducts()

    setProducts(data.data || [])
  }
  const loadOrders = async () => {

  const data =
    await fetchOrders()

  setOrderHistory(
    data.data || []
  )
}
  const addToCart = (product) => {

    const existingProduct =
      cart.find(
        item =>
          item._id === product._id
      )

    if (existingProduct) {

      if (
        existingProduct.quantity >=
        existingProduct.stock
      ) {

        alert(
          `Only ${existingProduct.stock} items available in inventory`
        )

        return
      }

      const updatedCart =
        cart.map(item =>

          item._id === product._id

            ?

            {
              ...item,
              quantity:
                item.quantity + 1
            }

            :

            item
        )

      setCart(updatedCart)

    }

    else {

      setCart([
        ...cart,
        {
          ...product,
          quantity: 1
        }
      ])
    }
  }

  const increaseQuantity = (id) => {

    const updatedCart =
      cart.map(item => {

        if (item._id === id) {

          if (
            item.quantity >=
            item.stock
          ) {

            alert(
              `Only ${item.stock} items available in inventory`
            )

            return item
          }

          return {
            ...item,
            quantity:
              item.quantity + 1
          }
        }

        return item
      })

    setCart(updatedCart)
  }

  const decreaseQuantity = (id) => {

    const updatedCart =
      cart.map(item =>

        item._id === id

          ?

          {
            ...item,
            quantity:
              item.quantity - 1
          }

          :

          item
      ).filter(
        item =>
          item.quantity > 0
      )

    setCart(updatedCart)

    if (updatedCart.length === 0) {

      setDiscount(0)
    }
  }

  const removeFromCart = (id) => {

    const updatedCart =
      cart.filter(
        item =>
          item._id !== id
      )

    setCart(updatedCart)

    if (updatedCart.length === 0) {

      setDiscount(0)
    }
  }

  const filteredProducts =
    products.filter(product =>

      product.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    )

  const subtotal =
    cart.reduce(
      (
        total,
        item
      ) =>

        total +
        (
          item.price *
          item.quantity
        ),

      0
    )

  const discountAmount =
    (
      subtotal *
      discount
    ) / 100

  const totalPrice =
    subtotal -
    discountAmount

  const handleCheckout = async () => {

  if (cart.length === 0) {

    alert(
      'Cart is empty'
    )

    return
  }

  const orderData = {

    products:
      cart.map(item => ({
        product:
          item._id,
        quantity:
          item.quantity
      })),

    totalAmount:
      totalPrice
  }

  const data =
    await createOrder(
      orderData
    )

  if (!data.success) {

    alert(data.message)

    return
  }

  alert(
    'Order placed successfully'
  )

  setCart([])

  setDiscount(0)

  loadProducts()

  loadOrders()
}

  return (

    <div className="bg-slate-100 min-h-screen p-8">

      <div className="flex justify-between items-center mb-10">

        <div>

          <h1 className="text-4xl font-bold text-slate-800">
            POS Billing System
          </h1>

          <p className="text-slate-500 mt-2">
            Process customer orders and generate bills
          </p>

        </div>

      <div className="flex gap-4">

  <button
    onClick={() =>
      setActivePage(
        'dashboard'
      )
    }
    className="bg-slate-800 hover:bg-slate-900 transition text-white px-5 py-3 rounded-xl font-semibold shadow-lg"
  >

    Back To Dashboard

  </button>

  <div className="bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold shadow-lg">

    Cashier Terminal

  </div>

</div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        <div className="lg:col-span-2">

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-6 text-slate-800">

              Available Products

            </h2>

            <div className="mb-6">

              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full border border-slate-300 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-blue-300"
              />

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {

                filteredProducts.map(
                  product => (

                    <div
                      key={product._id}
                      className="border border-slate-200 rounded-2xl p-6 hover:shadow-xl transition bg-white"
                    >

                      <h3 className="text-xl font-bold text-slate-800 mb-3">

                        {product.name}

                      </h3>

                      <p className="text-slate-500 mb-2">

                        {product.category}

                      </p>

                      <p className="text-green-600 text-2xl font-bold mb-2">

                        ₹{product.price}

                      </p>

                      <p className="text-sm text-slate-500 mb-5">

                        Stock Available:
                        {' '}
                        {product.stock}

                      </p>

                      <button
                        onClick={() =>
                          addToCart(product)
                        }
                        className="w-full bg-blue-600 hover:bg-blue-700 transition text-white p-3 rounded-xl font-semibold"
                      >

                        Add To Cart

                      </button>

                    </div>

                  )
                )

              }

            </div>

          </div>

        </div>

        <div>

          <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">

            <h2 className="text-2xl font-bold mb-6 text-slate-800">

              Current Bill

            </h2>

            <div className="space-y-5 max-h-96 overflow-y-auto">

              {

                cart.length === 0

                  ?

                  <p className="text-slate-500">

                    No products added.

                  </p>

                  :

                  cart.map(
                    item => (

                      <div
                        key={item._id}
                        className="border-b pb-4"
                      >

                        <div className="flex justify-between items-center mb-3">

                          <div>

                            <p className="font-semibold text-slate-700">

                              {item.name}

                            </p>

                            <p className="text-sm text-slate-500">

                              ₹{item.price}

                            </p>

                          </div>

                          <button
                            onClick={() =>
                              removeFromCart(
                                item._id
                              )
                            }
                            className="bg-red-500 hover:bg-red-600 transition text-white px-3 py-1 rounded-lg text-sm"
                          >

                            Remove

                          </button>

                        </div>

                        <div className="flex items-center gap-3">

                          <button
                            onClick={() =>
                              decreaseQuantity(
                                item._id
                              )
                            }
                            className="bg-slate-200 hover:bg-slate-300 px-3 py-1 rounded-lg"
                          >
                            -
                          </button>

                          <span className="font-bold text-lg">

                            {item.quantity}

                          </span>

                          <button
                            onClick={() =>
                              increaseQuantity(
                                item._id
                              )
                            }
                            className="bg-slate-200 hover:bg-slate-300 px-3 py-1 rounded-lg"
                          >
                            +
                          </button>

                        </div>

                      </div>

                    )
                  )

              }

            </div>

            <div className="mt-8 border-t pt-5">

              <div className="mb-5">

                <label className="block text-sm font-semibold text-slate-600 mb-2">

                  Discount Percentage

                </label>

                <input
                  type="number"
                  value={discount}
                  onChange={(e) => {

                    const value =
                      Number(e.target.value)

                    if (value < 0) {

                      setDiscount(0)

                      return
                    }

                    if (value > 100) {

                      setDiscount(100)

                      return
                    }

                    setDiscount(value)
                  }}
                  placeholder="Enter discount %"
                  className="w-full border border-slate-300 rounded-xl p-3 outline-none focus:ring-2 focus:ring-blue-300"
                />

              </div>

              <div className="space-y-3 mb-6">

                <div className="flex justify-between">

                  <p className="text-slate-600">
                    Subtotal
                  </p>

                  <p className="font-semibold">
                    ₹{subtotal}
                  </p>

                </div>

                <div className="flex justify-between">

                  <p className="text-slate-600">
                    Discount
                  </p>

                  <p className="font-semibold text-red-500">
                    - ₹{discountAmount}
                  </p>

                </div>

              </div>

              <div className="flex justify-between items-center mb-6">

                <p className="text-xl font-bold text-slate-800">

                  Final Total

                </p>

                <p className="text-3xl font-bold text-blue-600">

                  ₹{totalPrice}

                </p>

              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-green-600 hover:bg-green-700 transition text-white p-4 rounded-xl font-bold shadow-lg"
              >

                Proceed To Checkout

              </button>

            </div>

          </div>

        </div>

      </div>

      <div className="mt-10 bg-white rounded-2xl shadow-lg p-6">

        <h2 className="text-2xl font-bold text-slate-800 mb-6">

          Sales History

        </h2>

        {

          orderHistory.length === 0

            ?

            <p className="text-slate-500">

              No completed orders yet.

            </p>

            :

            orderHistory.map(
              order => (

                <div
                  key={order._id}
                  className="border-b py-5"
                >

                  <div className="flex justify-between items-center mb-3">

                    <div>

                      <p className="font-bold text-slate-700">

                        Order ID:
                        {' '}
                        {order._id}

                      </p>

                      <p className="text-sm text-slate-500">

                        {order.createdAt}

                      </p>

                    </div>

                    <div className="text-right">

                      <p className="font-bold text-green-600 text-xl">

                        ₹{order.totalAmount}

                      </p>

                    </div>

                  </div>

                  <div className="text-sm text-slate-600">

                    {

                      order.products.map(
  item => (

    <p key={item._id}>

      {item.product?.name}
      {' '}
      ×
      {' '}
      {item.quantity}

    </p>

  )
)

                    }

                  </div>

                </div>

              )
            )

        }

      </div>

    </div>
  )
}
