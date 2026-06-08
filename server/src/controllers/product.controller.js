const Product = require('../models/product.model')
//create new product
const createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body)

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      data: product
    })
  } catch (error){
    if(error.code===11000){
      return res.status(400).json({
       success:false,
       message: 'SKU already exists'})}
     res.status(500).json({
       succes:false,
       message: error.message})
  }
}
//Fetch all products with search and filter
const getProducts = async (req, res) => {
  try {
    const { search, category } = req.query

let query = {}

if (search) {
  query.name = {
    $regex: search,
    $options: 'i'
  }
}

if (category) {
  query.category ={
    $regex: category,
    $options: 'i'
  }
}

const products = await Product.find(query)
const updatedProducts = products.map(product => {
  const productObj = product.toObject()

  productObj.lowStock = product.stock <=5
  productObj.warning=product.stock<=5?'Low stock alert':'stock available'
  return productObj
})

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully',
      count: updatedProducts.length,
      data: updatedProducts
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
//Update product details
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
      message: 'Product updated succesfully',
      data: product
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}
//Delete product
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
//Update inventory stock quantity
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
