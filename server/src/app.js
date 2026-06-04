const express = require('express')

const cors = require('cors')

const productRoutes = require('./routes/product.routes')

const authRoutes = require('./routes/auth.routes')

const orderRoutes = require('./routes/order.routes')
const dashboardRoutes = require('./routes/dashboard.routes')
const userRoutes =
  require('./routes/user.routes')
const app = express()

app.use(cors())

app.use(express.json())

app.get('/', (req, res) => {

  res.send('Retail POS API Running')

})
app.use(
  '/users',
  userRoutes
)
app.use('/products', productRoutes)

app.use('/auth', authRoutes)

app.use('/orders', orderRoutes)
app.use(
  '/dashboard',
  dashboardRoutes
)
module.exports = app
