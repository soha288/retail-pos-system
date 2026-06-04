const PRODUCT_API =
  'http://localhost:5000/products'

const ORDER_API =
  'http://localhost:5000/orders'

export const fetchProducts = async (
  search = ''
) => {

  const response = await fetch(
    `${PRODUCT_API}?search=${search}`
  )

  return response.json()
}

export const createProduct = async (
  productData
) => {

  const response = await fetch(
    PRODUCT_API,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(
        productData
      )
    }
  )

  return response.json()
}

export const deleteProduct = async (
  id
) => {

  const response = await fetch(
    `${PRODUCT_API}/${id}`,
    {
      method: 'DELETE'
    }
  )

  return response.json()
}

export const updateProduct = async (
  id,
  updatedData
) => {

  const response = await fetch(
    `${PRODUCT_API}/${id}`,
    {
      method: 'PUT',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(
        updatedData
      )
    }
  )

  return response.json()
}

export const updateStock = async (
  id,
  quantity
) => {

  const response = await fetch(
    `${PRODUCT_API}/${id}/stock`,
    {
      method: 'PATCH',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        quantity
      })
    }
  )

  return response.json()
}

export const createOrder = async (
  orderData
) => {

  const response = await fetch(
    ORDER_API,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(
        orderData
      )
    }
  )

  return response.json()
}

export const fetchOrders = async () => {

  const response = await fetch(
    ORDER_API
  )

  return response.json()
}
export const fetchDashboardStats =
  async () => {

    const response =
      await fetch(
        'http://localhost:5000/dashboard'
      )

    return response.json()
}
export const downloadSalesReport =
  async () => {

    const response =
      await fetch(
        'http://localhost:5000/orders'
      )

    return response.json()
}
const USER_API =
  'http://localhost:5000/users'

export const fetchUsers =
  async () => {

    const response =
      await fetch(USER_API)

    return response.json()
}

export const createUser =
  async (userData) => {

    const response =
      await fetch(
        USER_API,
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json'
          },

          body: JSON.stringify(
            userData
          )
        }
      )

    return response.json()
}

export const deleteUser =
  async (id) => {

    const response =
      await fetch(
        `${USER_API}/${id}`,
        {
          method: 'DELETE'
        }
      )

    return response.json()
}
