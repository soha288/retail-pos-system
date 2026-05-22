const mongoose = require('mongoose')

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required:[ true, 'Product name is required'],
      trim:true
    },

    sku: {
      type: String,
      required:[ true, 'SKU is required'],
      unique: true,
      trim:true
    },

    category: {
      type: String,
      required:[ true, 'Category is required'],
      trim:true
    },

    price: {
      type: Number,
      required:[ true, 'Price is required'],
      min:[1, 'Price must be greater than zero']
    },

    stock: {
      type: Number,
      default: 0,
      min:[0, 'Stock connot be negative']
    }
  },
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Product', productSchema)
