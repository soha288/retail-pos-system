const Order = require('../models/order.model')

const Product = require('../models/product.model')

const createOrder = async (
  req,
  res
) => {

  try {

    const {
      products,
      totalAmount
    } = req.body

    for (const item of products) {

      const product =
        await Product.findById(
          item.product
        )

      if (!product) {

        return res.status(404).json({
          success: false,
          message: 'Product not found'
        })
      }

      if (
        product.stock <
        item.quantity
      ) {

        return res.status(400).json({
          success: false,
          message:
            `${product.name} has insufficient stock`
        })
      }

      product.stock -=
        item.quantity

      await product.save()
    }

    const order =
      await Order.create({
        products,
        totalAmount
      })

    res.status(201).json({
      success: true,
      message:
        'Order placed successfully',
      order
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

const getOrders = async (
  req,
  res
) => {

  try {

    const orders =
      await Order.find()
        .populate(
          'products.product'
        )
        .sort({
          createdAt: -1
        })

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    })

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    })
  }
}

module.exports = {
  createOrder,
  getOrders
}
