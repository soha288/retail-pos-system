const Order = require('../models/order.model')

const createOrder = async (
  req,
  res
) => {

  try {

    const order =
      await Order.create(req.body)

    res.status(201).json({
      success: true,
      message: 'Order created successfully',
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
        .populate('cashier')
        .populate('products.product')

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
