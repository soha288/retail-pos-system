const Product = require('../models/product.model')

const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body)

    res.status(201).json({
      success: true,
      data: product
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
const getProducts = async (req, res) => {
  try {
    const products = await Product.find()

    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
module.exports = {
  createProduct,
  getProducts
}
