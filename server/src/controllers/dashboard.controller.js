const Product =
  require('../models/product.model')

const Order =
  require('../models/order.model')

const getDashboardStats =
  async (req, res) => {

    try {

      const totalProducts =
        await Product.countDocuments()

      const lowStockProducts =
        await Product.countDocuments({
          stock: {
            $lt: 5
          }
        })

      const totalOrders =
        await Order.countDocuments()

      const orders =
        await Order.find()

      const totalRevenue =
        orders.reduce(
          (acc, order) =>
            acc +
            order.totalAmount,
          0
        )

      const lowStockItems =
        await Product.find({
          stock: {
            $lt: 5
          }
        })

      res.status(200).json({
        success: true,

        data: {
          totalProducts,
          lowStockProducts,
          totalOrders,
          totalRevenue,
          lowStockItems
        }
      })

    } catch (error) {

      res.status(500).json({
        success: false,
        message: error.message
      })
    }
  }

module.exports = {
  getDashboardStats
}
