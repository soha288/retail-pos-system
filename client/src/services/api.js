const API_URL = 'http://localhost:5000/products'

export const fetchProducts = async (
  search = ''
) => {

  const response = await fetch(
    `${API_URL}?search=${search}`
  )

  return response.json()
}

export const createProduct = async (
  productData
) => {

  const response = await fetch(
    API_URL,
    {
      method: 'POST',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(productData)
    }
  )

  return response.json()
}

export const deleteProduct = async (id) => {

  const response = await fetch(
    `${API_URL}/${id}`,
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
    `${API_URL}/${id}`,
    {
      method: 'PUT',

      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(updatedData)
    }
  )

  return response.json()
}
export const updateStock = async (
  id,
  quantity
) => {

  const response = await fetch(
    `${API_URL}/${id}/stock`,
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
