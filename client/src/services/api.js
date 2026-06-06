const BASE_URL =
  'http://localhost:5000'

const PRODUCT_API =
  `${BASE_URL}/products`

const ORDER_API =
  `${BASE_URL}/orders`

const USER_API =
  `${BASE_URL}/users`

// PRODUCTS

export const fetchProducts =
  async (search = '') => {

    const response =
      await fetch(
        `${PRODUCT_API}?search=${search}`
      )

    return response.json()
  }

export const createProduct =
  async (productData) => {

    const response =
      await fetch(
        PRODUCT_API,
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json'
          },

          body: JSON.stringify(
            productData
          )
        }
      )

    return response.json()
  }

export const deleteProduct =
  async (id) => {

    const response =
      await fetch(
        `${PRODUCT_API}/${id}`,
        {
          method: 'DELETE'
        }
      )

    return response.json()
  }

export const updateProduct =
  async (
    id,
    updatedData
  ) => {

    const response =
      await fetch(
        `${PRODUCT_API}/${id}`,
        {
          method: 'PUT',

          headers: {
            'Content-Type':
              'application/json'
          },

          body: JSON.stringify(
            updatedData
          )
        }
      )

    return response.json()
  }

export const updateStock =
  async (
    id,
    quantity
  ) => {

    const response =
      await fetch(
        `${PRODUCT_API}/${id}/stock`,
        {
          method: 'PATCH',

          headers: {
            'Content-Type':
              'application/json'
          },

          body: JSON.stringify({
            quantity
          })
        }
      )

    return response.json()
  }

// ORDERS

export const createOrder =
  async (orderData) => {

    const response =
      await fetch(
        ORDER_API,
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json'
          },

          body: JSON.stringify(
            orderData
          )
        }
      )

    return response.json()
  }

export const fetchOrders =
  async () => {

    const response =
      await fetch(
        ORDER_API
      )

    return response.json()
  }

// DASHBOARD

export const fetchDashboardStats =
  async () => {

    const response =
      await fetch(
        `${BASE_URL}/dashboard`
      )

    return response.json()
  }

// REPORTS

export const downloadSalesReport =
  async () => {

    const response =
      await fetch(
        `${BASE_URL}/orders`
      )

    return response.json()
  }

// USERS

export const fetchUsers =
  async () => {

    const token =
      localStorage.getItem(
        'token'
      )

    const response =
      await fetch(
        USER_API,
        {
          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      )

    return response.json()
  }

export const createUser =
  async (userData) => {

    const token =
      localStorage.getItem(
        'token'
      )

    const response =
      await fetch(
        USER_API,
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json',

            Authorization:
              `Bearer ${token}`
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

    const token =
      localStorage.getItem(
        'token'
      )

    const response =
      await fetch(
        `${USER_API}/${id}`,
        {
          method: 'DELETE',

          headers: {
            Authorization:
              `Bearer ${token}`
          }
        }
      )

    return response.json()
  }

// AUTH

export const loginUser =
  async (loginData) => {

    const response =
      await fetch(
        `${BASE_URL}/auth/login`,
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'application/json'
          },

          body: JSON.stringify(
            loginData
          )
        }
      )

    return response.json()
  }
