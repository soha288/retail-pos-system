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
const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        returnDocument: 'after',
        runValidators: true
      }
    )

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }

    res.status(200).json({
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
const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }

    res.status(200).json({
      success: true,
      message: 'Product deleted successfully'
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
const updateStock = async (req, res) => {
  try {
    const { quantity } = req.body

    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      })
    }

    product.stock += quantity

    if (product.stock < 0) {
      return res.status(400).json({
        success: false,
        message: 'Stock cannot be negative'
      })
    }

    await product.save()

    res.status(200).json({
      success: true,
      message: 'Stock updated successfully',
      data: product
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
  getProducts,
  updateProduct,
  deleteProduct,
  updateStock
}
